import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Industry, IndustryData, IndustryPatch, IndustryQuery } from './industry.schema'
import { Op } from 'sequelize'
import { State } from '../../models/state.model'

export type { Industry, IndustryData, IndustryPatch, IndustryQuery }

export interface IndustryParams extends Params {
  query?: {
    selectedJobs: { occ_title: string; occ_code: string }[]
    minSalary1: number
    minSalary2: number
    jobLevel: 'entry-level' | 'senior' | 'both'
  }
}

export interface IndustryGetParams extends Params {
  query?: {
    nearby: boolean
    area_code: number
    selectedJobs: string[]
    latitude: number
    longitude: number
  }
}

type City = {
  city_id?: number
  area_code?: number
  Latitude?: number
  Longitude?: number
}

export class IndustryService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: IndustryParams): Promise<any[] | Paginated<any>> {
    const queryData = params.query

    if (!queryData) {
      throw new Error('No query data provided.')
    }
    console.log('queryData', queryData)
    const { selectedJobs, minSalary1, minSalary2, jobLevel } = queryData

    if (!selectedJobs || selectedJobs.length === 0) {
      throw new Error('No selected jobs provided.')
    }

    const occ_codes = selectedJobs.map((job: any) => job.occ_code)
    let whereClause: any
    let topAreas

    if (selectedJobs.length === 1) {
      // Use original logic when only one job is selected
      whereClause = {
        occ_code: { [Op.in]: occ_codes },
        average_salary: { [Op.gte]: minSalary1 } // Assuming minSalary1 applies to the single job
      }

      topAreas = await this.queryTopAreas(whereClause)
    } else if (selectedJobs.length === 2) {
      // When two jobs are provided, find areas that meet the requirements for both jobs
      const areasForFirstJob = await this.getAreasForJob(selectedJobs[0].occ_code, minSalary1)
      const areasForSecondJob = await this.getAreasForJob(selectedJobs[1].occ_code, minSalary2)

      // Find overlapping areas
      const commonAreaCodes = areasForFirstJob.filter((areaCode) => areasForSecondJob.includes(areaCode))

      // If no common areas, return empty or handle accordingly
      if (commonAreaCodes.length === 0) {
        return [] // Or handle as needed
      }

      topAreas = await this.sequelize.models.CityIndustrySalary.findAll({
        where: {
          occ_code: { [Op.in]: occ_codes },
          area_code: { [Op.in]: commonAreaCodes }
        },
        attributes: [
          'area_code',
          [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_salary')), 'avg_salary'],
          [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_hourly')), 'avg_hourly']
        ],
        group: ['area_code'],
        order: [[this.sequelize.col('avg_salary'), 'DESC']],
        limit: 300
      })
    }

    //for top cities, get the cities that are associated with the area_code for that city
    const topCities = await this.sequelize.models.City.findAll({
      attributes: ['city_id', 'area_code', 'county_fips'],
      where: {
        area_code: topAreas.map((city: any) => city.area_code)
      }
    })

    const topCitiesWithSalary = topAreas
      .map((city: any) => {
        const relatedCities = topCities.filter((c: any) => c.area_code === city.area_code)
        return relatedCities.map((cityData: any) => ({
          city_id: cityData.city_id,
          county: cityData.county_fips,
          avg_salary: city.dataValues.avg_salary,
          avg_hourly: city.dataValues.avg_hourly
        }))
      })
      .flat()
      .slice(0, 300)

    const sortedCitiesWithSalary = topCitiesWithSalary.sort((a: any, b: any) => b.avg_salary - a.avg_salary)

    let ranking = 1
    let skipRank = 0
    let previousAvgSalary = sortedCitiesWithSalary[0]?.avg_salary

    const rankedCitiesWithSalary = sortedCitiesWithSalary.map((city: any, index: any) => {
      if (city.avg_salary !== previousAvgSalary) {
        ranking += skipRank
        skipRank = 1
      } else {
        if (index !== 0) {
          skipRank++
        }
      }
      previousAvgSalary = city.avg_salary
      return {
        ...city,
        ranking
      }
    })

    if (rankedCitiesWithSalary.length < 10) {
      console.log('obtained less than 10 cities from industry')
    }

    return {
      jobs: selectedJobs.map((job: any) => job.occ_title),
      topCities: rankedCitiesWithSalary
    } as any
  }

  async queryTopAreas(whereClause: any): Promise<any[]> {
    const CityIndustrySalary = this.sequelize.models.CityIndustrySalary

    return await CityIndustrySalary.findAll({
      where: whereClause,
      attributes: [
        'area_code',
        [this.sequelize.fn('AVG', this.sequelize.col('average_salary')), 'avg_salary'],
        [this.sequelize.fn('AVG', this.sequelize.col('average_hourly')), 'avg_hourly']
      ],
      group: ['area_code'],
      order: [[this.sequelize.col('avg_salary'), 'DESC']],
      limit: 300
    })
  }

  async getAreasForJob(occ_code: string, minSalary: number): Promise<string[]> {
    const CityIndustrySalary = this.sequelize.models.CityIndustrySalary

    const areas = await CityIndustrySalary.findAll({
      where: {
        occ_code: occ_code,
        average_salary: { [Op.gte]: minSalary }
      },
      attributes: ['area_code'],
      group: ['area_code']
    })

    // Extract area codes from the query results
    return areas.map((area: any) => area.get('area_code'))
  }

  async findClosestCityWithJobData(latitude: any, longitude: any, selectedJobs: any) {
    const closestCity = await this.sequelize.models.City.findOne({
      attributes: ['area_code', 'Longitude', 'Latitude'],
      include: [
        {
          model: this.sequelize.models.Area,
          include: [
            {
              model: this.sequelize.models.CityIndustrySalary,
              where: {
                occ_code: { [Op.in]: selectedJobs.map((job: any) => job.occ_code) }
              }
            }
          ]
        }
      ],
      order: [
        [
          this.sequelize.fn(
            'SQRT',
            this.sequelize.literal(`POW(${latitude} - Latitude, 2) + POW(${longitude} - Longitude, 2)`)
          ),
          'ASC'
        ]
      ],
      limit: 1
    })

    return closestCity ? closestCity.area_code : null
  }

  async get(id: Id, params?: IndustryGetParams): Promise<any> {
    const queryData = params?.query

    if (!queryData) {
      throw new Error('No query data provided.')
    }
    const { nearby, area_code, selectedJobs, latitude, longitude } = queryData
    console.log(Array.isArray(selectedJobs))

    let jobData = []

    if (!nearby) {
      jobData = await this.sequelize.models.CityIndustrySalary.findAll({
        where: {
          area_code,
          occ_code: { [Op.in]: selectedJobs.map((job: any) => job.occ_code) }
        }
      })

      if (jobData.length > 0) {
        return jobData
      }
    }

    const closestAreaCode = await this.findClosestCityWithJobData(latitude, longitude, selectedJobs)

    if (closestAreaCode) {
      jobData = await this.sequelize.models.CityIndustrySalary.findAll({
        where: {
          area_code: closestAreaCode,
          occ_code: { [Op.in]: selectedJobs.map((job: any) => job.occ_code) }
        }
      })
    }

    return jobData
  }

  async create(data: any, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

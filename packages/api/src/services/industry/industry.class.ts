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
    minPopulation: number
    maxPopulation: number
    includedStates: number[]
  }
}

export interface IndustryGetParams extends Params {
  query?: {
    nearby: boolean
    area_code?: number
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

type CityWhereCondition = {
  pop_2022?: {}
  state_code?: {
    [key: string]: number[]
  }
  area_code: number[]
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

    const { selectedJobs, minSalary1, minSalary2, jobLevel, minPopulation, maxPopulation, includedStates } =
      queryData

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
        limit: 10000
      })
    }

    let cityWhereCondition: CityWhereCondition = {
      area_code: topAreas.map((city: any) => city.area_code)
    }

    if (minPopulation >= 0 && maxPopulation >= 0) {
      cityWhereCondition.pop_2022 = {
        [Op.gte]: minPopulation,
        [Op.lte]: maxPopulation
      }
    } else if (minPopulation >= 0) {
      cityWhereCondition.pop_2022 = { [Op.gte]: minPopulation }
    } else if (maxPopulation >= 0) {
      cityWhereCondition.pop_2022 = { [Op.lte]: maxPopulation }
    }

    if (includedStates?.length > 0) {
      cityWhereCondition.state_code = {
        [Op.in]: includedStates
      }
    }

    //for top cities, get the cities that are associated with the area_code for that city
    const topCities = await this.sequelize.models.City.findAll({
      attributes: ['city_id', 'area_code', 'county_fips'],
      where: cityWhereCondition
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
      .slice(0, 10000)

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
      limit: 10000
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

    return areas.map((area: any) => area.get('area_code'))
  }

  async findClosestCityWithJobData(latitude: any, longitude: any, occCodes: any) {
    const query = `SELECT City.area_code, City.Longitude, City.Latitude, City.city_id, City.city_name, City.state_code,
    (3959 * acos(
        cos(radians(:latitude)) *
        cos(radians(City.Latitude)) *
        cos(radians(City.Longitude) - radians(:longitude)) +
        sin(radians(:latitude)) *
        sin(radians(City.Latitude))
    )) AS distance
    FROM City
    INNER JOIN Area ON City.area_code = Area.area_code
    INNER JOIN CityIndustrySalary ON Area.area_code = CityIndustrySalary.area_code
    WHERE CityIndustrySalary.occ_code IN (:occCodes)
    HAVING distance <= 50
    ORDER BY distance ASC
    LIMIT 1;
    `
    const replacements = {
      occCodes,
      latitude,
      longitude
    }

    try {
      const [results, metadata] = await this.sequelize.query(query, {
        replacements,
        type: this.sequelize.QueryTypes.SELECT
      })
      return results || null
    } catch (error) {
      console.error('Error finding closest city with job data:', error)
      return null
    }
  }

  async get(id: Id, params?: IndustryGetParams): Promise<any> {
    const queryData = params?.query

    if (!queryData) {
      throw new Error('No query data provided.')
    }
    const { nearby, area_code, selectedJobs, latitude, longitude } = queryData

    let jobData = []

    const occCodes = selectedJobs.map((job: any) => job.occ_code)

    if (!nearby) {
      jobData = await this.sequelize.models.CityIndustrySalary.findAll({
        where: {
          area_code,
          occ_code: { [Op.in]: occCodes }
        },
        include: [
          {
            model: this.sequelize.models.Occupation,
            attributes: ['occ_title']
          }
        ]
      })

      if (jobData.length > 0) {
        return jobData
      }
    }

    const closestArea = await this.findClosestCityWithJobData(latitude, longitude, occCodes)

    if (!closestArea) {
      return []
    }
    const {
      area_code: closestAreaCode,
      city_name: closestCityName,
      city_id: closestCityId,
      state_code: closestCityState
    } = closestArea || {}

    if (closestAreaCode) {
      jobData = await this.sequelize.models.CityIndustrySalary.findAll({
        where: {
          area_code: closestAreaCode,
          occ_code: { [Op.in]: occCodes }
        },
        include: [
          {
            model: this.sequelize.models.Occupation,
            attributes: ['occ_title']
          }
        ]
      })
    }

    jobData = jobData.map((job: any) => {
      job.dataValues.closestCity = {
        city_id: closestCityId,
        city_name: closestCityName,
        state_code: closestCityState
      }
      return job
    })

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

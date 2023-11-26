import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Industry, IndustryData, IndustryPatch, IndustryQuery } from './industry.schema'
import { Op } from 'sequelize'
import { State } from '../../models/state.model'

export type { Industry, IndustryData, IndustryPatch, IndustryQuery }

export interface IndustryParams extends Params {
  query?: {
    selectedJobs: { occ_title: string; occ_code: string }[]
    minSalary: number
    jobLevel: 'entry-level' | 'senior' | 'both'
  }
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
    const { selectedJobs, minSalary, jobLevel } = queryData

    if (!selectedJobs || selectedJobs.length === 0) {
      throw new Error('No selected jobs provided.')
    }

    const occ_codes = selectedJobs.map((job: any) => job.occ_code)

    let whereClause: any = {
      occ_code: { [Op.in]: occ_codes },
      average_salary: {
        [Op.gte]: minSalary
      }
    }

    // Adjusting for job level
    if (jobLevel === 'entry-level') {
      whereClause['average_salary'] = {
        [Op.lte]: this.sequelize.col('h_median')
      }
    } else if (jobLevel === 'senior') {
      whereClause['average_salary'] = {
        [Op.gt]: this.sequelize.col('h_median')
      }
    }

    //get top cities
    const CityIndustrySalary = this.sequelize.models.CityIndustrySalary
    const Area = this.sequelize.models.Area

    const topAreas = await CityIndustrySalary.findAll({
      where: {
        ...whereClause
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
    //for top cities, get the cities that are associated with the area_code for that city
    const topCities = await this.sequelize.models.City.findAll({
      attributes: ['city_id', 'area_code'],
      where: {
        area_code: topAreas.map((city: any) => city.area_code)
      }
    })

    //map the cities to their salary
    const topCitiesWithSalary = topAreas
      .map((city: any) => {
        const relatedCities = topCities.filter((c: any) => c.area_code === city.area_code)
        return relatedCities.map((cityData: any) => ({
          city_id: cityData.city_id,
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

  async get(id: Id, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
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

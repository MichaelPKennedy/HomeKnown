import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type {
  PublicServices,
  PublicServicesData,
  PublicServicesPatch,
  PublicServicesQuery
} from './public-services.schema'

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

export type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery }

export interface PublicServicesParams extends Params {
  query?: {
    publicServices?: string[]
    searchRadius?: number
    minPopulation: number
    maxPopulation: number
    includedStates: number[]
  }
}

type CityWhereCondition = {
  pop_2022?: {}
  state_code?: {
    [key: string]: number[]
  }
}

export class PublicServicesService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: PublicServicesParams): Promise<any[] | Paginated<any>> {
    if (!params.query) {
      throw new Error('Query parameters are missing!')
    }

    const { minPopulation, maxPopulation, includedStates } = params?.query
    let publicServicesArray = params.query?.publicServices || []
    const radius = params.query?.searchRadius || 10

    if (typeof publicServicesArray === 'string') {
      publicServicesArray = [publicServicesArray]
    }

    let cityWhereCondition: CityWhereCondition = {}

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

    const citiesWithCounts = await this.sequelize.models.City.findAll({
      attributes: ['city_id', 'county_fips'],
      include: [
        {
          model: this.sequelize.models.PublicServiceCache,
          as: 'PublicServiceCache',
          attributes: publicServicesArray.map((service: string) => `${service}${radius}`)
        }
      ],
      where: cityWhereCondition
    })

    const cityScores = citiesWithCounts.map((cityWithCount: any) => {
      let count = 0
      for (const service of publicServicesArray) {
        const column = `${service}${radius}`
        count += cityWithCount?.PublicServiceCache?.[column] || 0
      }

      return {
        city_id: cityWithCount.city_id,
        county: cityWithCount.county_fips,
        count
      }
    })

    const sortedCities = cityScores.sort((a: any, b: any) => b.count - a.count).slice(0, 300)

    let ranking = 1
    let previousCount = sortedCities[0]?.count || 0
    const topCities = sortedCities.map((city: any, index: any) => {
      if (index > 0 && city.count < previousCount) {
        ranking = index + 1
      }
      previousCount = city.count

      return {
        ...city,
        ranking
      }
    })

    if (topCities.length < 10) {
      console.log('obtained less than 10 cities from public services')
    }

    return topCities
  }

  async get(id: Id, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

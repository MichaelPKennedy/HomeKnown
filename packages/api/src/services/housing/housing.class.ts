import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Housing, HousingData, HousingPatch, HousingQuery } from './housing.schema'
import { Op } from 'sequelize'

interface StateAttributes {
  state_code: number
  state: string
  state_abbrev: string
  totalCostIndex: number
  GroceryCostsIndex: number
  HealthCostsIndex: number
  HousingCostsIndex: number
  MiscCostsIndex: number
  TranspCostsIndex: number
  UtilCostsIndex: number
}

export type { Housing, HousingData, HousingPatch, HousingQuery }

export interface HousingParams extends Params {
  query?: { housingType: 'rent' | 'buy'; min: number; max: number }
}

export class HousingService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: HousingParams): Promise<any[] | Paginated<any>> {
    const City = this.sequelize.models.City
    const State = this.sequelize.models.State
    const states = await State.findAll({
      attributes: ['state_code', 'totalCostIndex']
    })

    const totalCostIndices = states.reduce((acc: { [key: number]: number }, state: StateAttributes) => {
      acc[state.state_code] = state.totalCostIndex
      return acc
    }, {})

    if (!params.query) {
      throw new Error('Query parameters are missing!')
    }
    const { min, max, housingType } = params.query

    const priceType = housingType === 'rent' ? 'currentRentPrice' : 'currentHomePrice'

    const cities = await City.findAll({
      where: {
        [priceType]: {
          [Op.gte]: min,
          [Op.lte]: max
        }
      },
      attributes: ['city_name', 'area_code', priceType]
    })

    const rankedCities = cities
      .map((city: any) => {
        const totalCostIndex = totalCostIndices[city.area_code]
        return {
          ...city.get(),
          rank: city[priceType] + (totalCostIndex || 0)
        }
      })
      .sort((a: any, b: any) => a.rank - b.rank)

    return rankedCities
  }

  async get(id: Id, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

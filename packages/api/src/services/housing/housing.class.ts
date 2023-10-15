import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Housing, HousingData, HousingPatch, HousingQuery } from './housing.schema'
import { Op } from 'sequelize'
import { State } from '../../models/state.model'
import { City } from '../../models/city.model'

export type { Housing, HousingData, HousingPatch, HousingQuery }

export interface HousingParams extends Params {
  query?: {}
}

export class HousingService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: HousingParams): Promise<any[] | Paginated<any>> {
    const states = await State.findAll({
      attributes: ['state_code', 'totalCostIndex']
    })

    const totalCostIndices: { [key: number]: number } = states.reduce((acc, state) => {
      acc[state.state_code] = state.totalCostIndex
      return acc
    }, {})

    const { min, max } = params.query

    const cities = await City.findAll({
      where: {
        currentHomePrice: {
          [Op.gte]: min,
          [Op.lte]: max
        }
      },
      attributes: ['city_name', 'area_code', 'currentHomePrice']
    })

    const rankedCities = cities
      .map((city) => {
        const totalCostIndex = totalCostIndices[city.area_code]
        return {
          ...city.get(),
          rank: city.currentHomePrice + (totalCostIndex || 0)
        }
      })
      .sort((a, b) => a.rank - b.rank)

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

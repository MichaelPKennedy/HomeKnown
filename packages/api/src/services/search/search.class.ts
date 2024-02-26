import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Search, SearchData, SearchPatch, SearchQuery } from './search.schema'
import { Op } from 'sequelize'
export type { Search, SearchData, SearchPatch, SearchQuery }

export interface SearchParams extends Params {
  query?: {
    search?: string
  }
}

interface City {
  city_name: string
  state_name: string
  city_id: number
}

export class SearchService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: SearchParams): Promise<any[] | Paginated<any>> {
    const queryStr = params.query?.search || ''

    try {
      const cities = await this.sequelize.models.City.findAll({
        where: {
          city_name: {
            [Op.like]: `%${queryStr}%`
          }
        },
        include: [
          {
            model: this.sequelize.models.State,
            attributes: ['state']
          }
        ],
        attributes: ['city_id', 'city_name', [this.sequelize.col('State.state'), 'state_name']],
        raw: true,
        limit: 30
      })

      return cities.map((city: City) => ({
        city_id: city.city_id,
        city_name: city.city_name,
        state_name: city.state_name
      }))
    } catch (error) {
      console.error('Error fetching cities:', error)
      throw new Error('Error fetching cities')
    }
  }

  async get(id: Id, params?: SearchParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: SearchParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: SearchParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: SearchParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: SearchParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

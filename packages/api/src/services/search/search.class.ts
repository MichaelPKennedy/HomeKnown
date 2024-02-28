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
      const searchPattern = `%${queryStr.replace(/\s+/g, '%')}%`

      const cities = await this.sequelize.models.City.findAll({
        where: {
          [Op.or]: [
            this.sequelize.where(
              this.sequelize.fn(
                'concat',
                this.sequelize.col('City.city_name'),
                ' ',
                this.sequelize.col('State.state')
              ),
              {
                [Op.like]: searchPattern
              }
            ),
            this.sequelize.where(
              this.sequelize.fn(
                'concat',
                this.sequelize.col('City.city_name'),
                ' ',
                this.sequelize.col('State.state_abbrev')
              ),
              {
                [Op.like]: searchPattern
              }
            )
          ]
        },
        include: [
          {
            model: this.sequelize.models.State,
            attributes: ['state', 'state_abbrev']
          }
        ],
        attributes: [
          'city_id',
          'city_name',
          [this.sequelize.col('State.state'), 'state_name'],
          [this.sequelize.col('State.state_abbrev'), 'state_abbrev']
        ],
        raw: true,
        limit: 30
      })

      return cities.map((city: any) => ({
        city_id: city.city_id,
        city_name: city.city_name,
        state_name: city.state_name,
        state_abbrev: city.state_abbrev
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

import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import { Op } from 'sequelize'

interface QueryParams {
  query: string
}

export interface WeatherParams extends Params {
  query?: QueryParams
}

export class WeatherService implements ServiceMethods<any> {
  app: Application
  sequelize: any // You can also type it more specifically if needed.

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: WeatherParams): Promise<any[] | Paginated<any>> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

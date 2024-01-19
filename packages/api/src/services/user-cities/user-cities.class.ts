import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { UserCities, UserCitiesData, UserCitiesPatch, UserCitiesQuery } from './user-cities.schema'

export type { UserCities, UserCitiesData, UserCitiesPatch, UserCitiesQuery }

export interface UserCitiesParams extends Params {
  query?: {
    user_id: string
  }
}

export class UserCitiesService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: UserCitiesParams): Promise<any> {
    const user_id = params.query?.user_id
    if (!user_id) {
      throw new Error('User ID is required to find hearted cities.')
    }

    const userCities = await this.sequelize.model('UserCities').findAll({
      where: { user_id: user_id },
      attributes: ['city_id'],
      raw: true
    })

    const cityIds = userCities.map((city: any) => city.city_id)

    return {
      total: userCities.length,
      data: cityIds
    }
  }

  async get(id: Id, params?: UserCitiesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: UserCitiesData, params?: UserCitiesParams): Promise<UserCities> {
    if (!data.user_id || !data.city_id) {
      throw new Error('User ID and City ID are required.')
    }

    const userCity = await this.sequelize.model('UserCities').create(data)
    return userCity
  }

  async update(id: NullableId, data: any, params?: UserCitiesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: UserCitiesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params: UserCitiesParams = {}): Promise<{ id: NullableId }> {
    const user_id = params.query?.user_id
    const city_id = id

    if (!user_id || !city_id) {
      throw new Error('User ID and City ID are required.')
    }

    await this.sequelize.model('UserCities').destroy({
      where: { user_id: user_id, city_id: city_id }
    })

    return { id: city_id }
  }
}

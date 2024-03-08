import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type {
  Recommendations,
  RecommendationsData,
  RecommendationsPatch,
  RecommendationsQuery
} from './recommendations.schema'

export type { Recommendations, RecommendationsData, RecommendationsPatch, RecommendationsQuery }

export interface RecommendationsParams extends Params {
  query?: {
    user_id: number
  }
}

export class RecommendationsService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: RecommendationsParams): Promise<any[] | Paginated<any>> {
    if (!params.query?.user_id) {
      throw new Error('user_id is required')
    }

    const userId = params.query.user_id

    try {
      const recommendations = await this.sequelize.models.UserRecommendedCities.findAll({
        where: { user_id: userId },
        include: [
          {
            model: this.sequelize.models.City,
            attributes: ['city_name'],
            include: [
              {
                model: this.sequelize.models.State,
                attributes: ['state']
              }
            ]
          }
        ],
        attributes: ['city_id']
      })

      const result = recommendations.map((r: any) => ({
        cityId: r.city_id,
        cityName: r.City.city_name,
        state: r.City.State.state
      }))

      return result
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      throw error
    }
  }

  async get(id: Id, params?: RecommendationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: RecommendationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: RecommendationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: RecommendationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: RecommendationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

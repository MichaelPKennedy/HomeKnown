import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Categories, CategoriesData, CategoriesPatch, CategoriesQuery } from './categories.schema'
import NodeCache from 'node-cache'
const myCache = new NodeCache({ stdTTL: 86400 }) // 24 hours
import { Op } from 'sequelize'

export type { Categories, CategoriesData, CategoriesPatch, CategoriesQuery }

interface City {
  city_id: number
  city_name: string
  area_code?: number
  latitude: number | null
  longitude: number | null
  currentHomePrice?: number | null
  currentRentPrice?: number | null
  pop_2022?: number | null
  cost_index?: number | null
  city_description?: string | null
  elevation?: number | null
  state_code?: number | null
  coast?: boolean | null
  tropical?: boolean | null
  collegeTown?: boolean | null
  winter?: boolean | null
}

const regions = [
  'Southeast',
  'Pacific',
  'Southwest',
  'South Central',
  'Pacific Coast',
  'Mountain West',
  'New England',
  'Mid-Atlantic',
  'Great Lakes',
  'Great Plains',
  'Pacific Northwest'
]

export interface CategoriesParams extends Params {
  query?: {}
}

interface CategoriesResult {
  topMonthlyCities: City[]
  topCities: City[]
  tropical: City[]
  coast: City[]
  collegeTown: City[]
  winter: City[]
  [key: string]: City[]
}

export class CategoriesService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: Params = {}): Promise<CategoriesResult | Paginated<CategoriesResult>> {
    const cacheKey = 'defaultCategoriesResult'
    const isDefaultQuery = !params.query || Object.keys(params.query).length === 0

    if (isDefaultQuery) {
      const cachedResult = myCache.get<CategoriesResult>(cacheKey)
      if (cachedResult) {
        return cachedResult
      }
    }

    const categories = ['tropical', 'coast', 'collegeTown', 'winter', ...regions]
    const result: Partial<CategoriesResult> = {}

    const stats = await this.app.service('stats').find()
    if (stats) {
      result.topMonthlyCities = stats.topMonthlyCities
      result.topCities = stats.topCities
    }

    const categoryPromises = categories.map(async (category) => {
      let whereCondition = {}
      if (['tropical', 'collegeTown', 'winter'].includes(category)) {
        whereCondition = { [category]: true }
      } else if (category === 'coast') {
        whereCondition = {
          coast: true,
          '$State.state_code$': { [Op.ne]: 15 }
        }
      } else {
        whereCondition = { '$State.region$': category }
      }

      const cities = await this.sequelize.models.City.findAll({
        where: whereCondition,
        attributes: ['city_name', 'city_id', 'Latitude', 'Longitude'],
        include: [
          {
            model: this.sequelize.models.State,
            as: 'State',
            required: true,
            attributes: ['state', 'region', 'state_code']
          },
          {
            model: this.sequelize.models.CityPhotos,
            required: false
          }
        ],
        limit: 50,
        nest: true,
        order: [
          [
            this.sequelize.literal(
              'COALESCE((SELECT COUNT(*) FROM CityPhotos WHERE CityPhotos.city_id = City.city_id), 0)'
            ),
            'DESC'
          ]
        ]
      })

      return {
        category,
        cities: cities.map((city: any) => ({
          city_id: city.city_id,
          city_name: city.city_name,
          state_name: city.State.state,
          latitude: city.Latitude,
          longitude: city.Longitude,
          region: city.State.region,
          photos: city.CityPhotos ? city.CityPhotos.map((photo: any) => photo.get({ plain: true })) : []
        }))
      }
    })

    const categoriesWithCities = await Promise.all(categoryPromises)

    categoriesWithCities.forEach(({ category, cities }) => {
      result[category] = cities
    })

    if (isDefaultQuery) {
      myCache.set(cacheKey, result)
    }

    return result as CategoriesResult
  }

  async get(id: Id, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: CategoriesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: CategoriesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: CategoriesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: CategoriesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

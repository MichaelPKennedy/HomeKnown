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
      if (['tropical', 'coast', 'collegeTown', 'winter'].includes(category)) {
        whereCondition = { [category]: true }
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
            attributes: ['state', 'region']
          },
          {
            model: this.sequelize.models.CityPhotos,
            required: false
          }
        ],
        limit: 50,
        nest: true
      })

      return {
        category,
        cities: cities
          .map((city: any) => ({
            city_id: city.city_id,
            city_name: city.city_name,
            state_name: city.State.state,
            latitude: city.Latitude,
            longitude: city.Longitude,
            region: city.State.region,
            photos: city.CityPhotos ? city.CityPhotos.map((photo: any) => photo.get({ plain: true })) : []
          }))
          .sort((a: any, b: any) => b.photos.length - a.photos.length)
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

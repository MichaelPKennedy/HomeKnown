import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Stats, StatsData, StatsPatch, StatsQuery } from './stats.schema'
import NodeCache from 'node-cache'
import { photos } from '../photos/photos'

export type { Stats, StatsData, StatsPatch, StatsQuery }

const myCache = new NodeCache({ stdTTL: 86400 }) // 24 hours

interface CityStats {
  ranking: number
  city_id: number
  count: number
  city_name: string
  state: string
}

interface StatsResult {
  topCities: CityStats[]
  topMonthlyCities: CityStats[]
}

export class StatsService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(): Promise<StatsResult> {
    const cacheKey = 'topCitiesAndTopMonthlyCities'
    const cachedData = myCache.get<StatsResult>(cacheKey)

    if (cachedData) {
      return cachedData
    }
    const now = new Date()
    const currentMonth = now.getMonth() + 1

    const topCities = (
      await this.sequelize.models.TopCities.findAll({
        attributes: ['ranking', 'city_id', 'count'],
        include: [
          {
            model: this.sequelize.models.City,
            attributes: ['city_name'],
            include: [
              {
                model: this.sequelize.models.State,
                attributes: ['state_abbrev']
              },
              {
                model: this.sequelize.models.TopCityPhotos,
                attributes: [
                  'full_url',
                  'regular_url',
                  'blur_hash',
                  'alt_description',
                  'photographer',
                  'profile_url'
                ]
              }
            ]
          }
        ]
      })
    ).map((city: any) => ({
      ranking: city.ranking,
      city_id: city.city_id,
      count: city.count,
      city_name: city.City.city_name,
      state: city.City.State.state_abbrev,
      photos: city.City.TopCityPhotos.map((photo: any) => ({
        full_url: photo.full_url,
        regular_url: photo.regular_url,
        blur_hash: photo.blur_hash,
        alt_description: photo.alt_description,
        photographer: photo.photographer,
        profile_url: photo.profile_url
      }))
    }))

    const topMonthlyCities = (
      await this.sequelize.models.TopMonthlyCities.findAll({
        where: {
          month: currentMonth
        },
        attributes: ['ranking', 'city_id', 'count'],
        include: [
          {
            model: this.sequelize.models.City,
            attributes: ['city_name'],
            include: [
              {
                model: this.sequelize.models.State,
                attributes: ['state_abbrev']
              },
              {
                model: this.sequelize.models.TopCityPhotos,
                attributes: [
                  'full_url',
                  'regular_url',
                  'blur_hash',
                  'alt_description',
                  'photographer',
                  'profile_url'
                ]
              }
            ]
          }
        ]
      })
    ).map((city: any) => ({
      ranking: city.ranking,
      city_id: city.city_id,
      count: city.count,
      city_name: city.City.city_name,
      state: city.City.State.state_abbrev,
      photos: city.City.TopCityPhotos.map((photo: any) => ({
        full_url: photo.full_url,
        regular_url: photo.regular_url,
        blur_hash: photo.blur_hash,
        alt_description: photo.alt_description,
        photographer: photo.photographer,
        profile_url: photo.profile_url
      }))
    }))

    const result: StatsResult = {
      topCities: topCities as CityStats[],
      topMonthlyCities: topMonthlyCities as CityStats[]
    }

    myCache.set(cacheKey, result)

    return result
  }

  async get(id: Id, params?: Params): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: Params): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: Params): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: Params): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: Params): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
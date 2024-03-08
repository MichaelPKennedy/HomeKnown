import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Stats, StatsData, StatsPatch, StatsQuery } from './stats.schema'
const { Op, col } = require('sequelize')

export type { Stats, StatsData, StatsPatch, StatsQuery }

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
                attributes: ['state']
              }
            ]
          }
        ]
      })
    ).map((city: any) => ({
      ranking: city.ranking,
      cityId: city.city_id,
      count: city.count,
      cityName: city.City.city_name,
      stateName: city.City.State.state
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
                attributes: ['state']
              }
            ]
          }
        ]
      })
    ).map((city: any) => ({
      ranking: city.ranking,
      cityId: city.city_id,
      count: city.count,
      city_name: city.City.city_name,
      state: city.City.State.state
    }))

    return {
      topCities: topCities as CityStats[],
      topMonthlyCities: topMonthlyCities as CityStats[]
    }
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

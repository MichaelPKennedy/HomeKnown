import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { WeatherSchema, WeatherData, WeatherPatch, WeatherQuery } from './weather.schema'
import type { Application } from '../../declarations'
import { Op } from 'sequelize'
import { CityWeather } from '../../../models/city-weather.model'
import { Weather } from '../../../models/weather.model'
import { State } from '../../../models/state.model'

export type { WeatherSchema, WeatherData, WeatherPatch, WeatherQuery }

interface QueryParams {
  query: string
}

export interface WeatherParams extends Params {
  temperature: number
  temperaturePreference?: 'mild' | 'distinct'
  climatePreference?: 'warmer' | 'cooler'
  snowPreference?: 'none' | 'light' | 'heavy'
  rainPreference?: 'dry' | 'regular'
  importantSeason?: 'winter' | 'summer' | 'spring' | 'fall'
  seasonPreferenceDetail?:
    | 'mildWinter'
    | 'coldWinter'
    | 'snowyWinter'
    | 'mildSummer'
    | 'hotSummer'
    | 'drySummer'
    | 'warmSpring'
    | 'coolSpring'
    | 'drySpring'
    | 'warmFall'
    | 'coolFall'
    | 'dryFall'
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

  private getColumnsByDetail(
    detail: string,
    prefix: string
  ): { high: string; low: string; prec: string; snow: string } {
    let columns = {
      high: `${prefix}_high`,
      low: `${prefix}_low`,
      prec: `${prefix}_prec`,
      snow: `${prefix}_snow`
    }

    // Can add more conditions based on detail if necessary

    return columns
  }

  async find(params: WeatherParams): Promise<any[] | Paginated<any>> {
    const {
      temperature,
      temperaturePreference,
      climatePreference,
      snowPreference,
      rainPreference,
      importantSeason,
      seasonPreferenceDetail
    } = params

    type WhereCondition = {
      [key: string]: any
    }

    // Step 1: Get top 10 states based on average temperature close to the user's preference
    let whereStateCondition: WhereCondition = {}
    if (temperaturePreference === 'mild') {
      whereStateCondition.avgTemp = {
        [Op.between]: [temperature - 5, temperature + 5] // Assuming 'mild' as ±5 of user's preferred temp
      }
    } else {
      whereStateCondition.avgTemp = temperature // 'distinct' matches the exact temperature
    }

    const topStates = await Weather.findAll({
      where: whereStateCondition,
      attributes: [
        'state_code',
        [this.sequelize.fn('AVG', this.sequelize.col('avgTemp')), 'avg_temperature']
      ],
      include: [
        {
          model: State,
          attributes: ['state', 'state_code', 'state_abbrev']
        }
      ],
      order: [[this.sequelize.fn('ABS', this.sequelize.literal(`AVG(avgTemp) - ${temperature}`)), 'ASC']],
      group: ['Weather.state_code', 'State.state_code', 'State.state'],
      limit: 10
    })

    const topStateAbbreviations = topStates.map((record: any) => record.State.getDataValue('state_abbrev'))

    // Step 2: Fetch the top 20 cities based on user's specific preferences from those states
    let whereCityCondition: WhereCondition = {
      state: { [Op.in]: topStateAbbreviations },
      area_code: { [Op.ne]: null }
    }

    if (importantSeason && seasonPreferenceDetail) {
      const prefix = importantSeason.slice(0, 3).toLowerCase() // 'jan', 'feb', etc.
      const { high, low, prec, snow } = this.getColumnsByDetail(seasonPreferenceDetail, prefix)
      whereCityCondition = {
        ...whereCityCondition,
        [high]: { [Op.gte]: temperature },
        [low]: { [Op.lte]: temperature }
      }

      if (snowPreference === 'none') {
        whereCityCondition[snow] = { [Op.eq]: 0 }
      } else if (snowPreference === 'light') {
        whereCityCondition[snow] = { [Op.between]: [0.1, 3] } // example range
      } else {
        whereCityCondition[snow] = { [Op.gt]: 3 } // heavy snow
      }

      if (rainPreference === 'dry') {
        whereCityCondition[prec] = { [Op.lte]: 0.5 } // example dry condition
      } else {
        whereCityCondition[prec] = { [Op.gt]: 0.5 } // regular rain
      }
    }

    const topCities = await CityWeather.findAll({
      where: whereCityCondition,
      include: [
        {
          model: State
        }
      ],
      limit: 50
    })

    return {
      topStates: topStates,
      topCities: topCities
    } as any
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

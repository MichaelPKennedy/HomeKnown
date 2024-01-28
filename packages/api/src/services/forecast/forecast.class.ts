import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Forecast, ForecastData, ForecastPatch, ForecastQuery } from './forecast.schema'
import { Op } from 'sequelize'
const process = require('process')
const NodeCache = require('node-cache')

const myCache = new NodeCache({ stdTTL: 3600 }) // 1 hour

export type { Forecast, ForecastData, ForecastPatch, ForecastQuery }

export interface ForecastParams extends Params {
  query?: { latitude: string; longitude: string }
}

export class ForecastService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: ForecastParams): Promise<any> {
    if (!params.query) {
      throw new Error('Query parameters are missing!')
    }

    const { latitude, longitude } = params.query
    const cacheKey = `weather_${latitude}_${longitude}`

    let cachedData = myCache.get(cacheKey)
    if (cachedData) {
      return cachedData
    }

    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
    )
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
    )

    const currentWeatherData = await currentWeatherResponse.json()
    const forecastData = await forecastResponse.json()

    const combinedData = {
      currentWeather: currentWeatherData,
      forecast: forecastData
    }

    myCache.set(cacheKey, combinedData)

    return combinedData
  }

  async get(id: Id, params?: ForecastParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: ForecastParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: ForecastParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: ForecastParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: ForecastParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

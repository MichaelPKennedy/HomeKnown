import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Forecast, ForecastData, ForecastPatch, ForecastQuery } from './forecast.schema'
import { Op } from 'sequelize'
const process = require('process')

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

  async find(params: ForecastParams): Promise<any[] | Paginated<any>> {
    if (!params.query) {
      throw new Error('Query parameters are missing!')
    }
    console.log('Params:', params)
    const { latitude, longitude } = params.query
    console.log('latitude', latitude)
    console.log('process.env.WEATHER_API_KEY', process.env.WEATHER_API_KEY)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.WEATHER_API_KEY}`
    )
    console.log('response', response)
    //change response to Fahrenheit

    return response.json()
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

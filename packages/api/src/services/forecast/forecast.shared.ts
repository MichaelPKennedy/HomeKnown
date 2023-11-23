// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Forecast, ForecastData, ForecastPatch, ForecastQuery, ForecastService } from './forecast.class'

export type { Forecast, ForecastData, ForecastPatch, ForecastQuery }

export type ForecastClientService = Pick<ForecastService, (typeof forecastMethods)[number]>

export const forecastPath = 'forecast'

export const forecastMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const forecastClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(forecastPath, connection.service(forecastPath), {
    methods: forecastMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [forecastPath]: ForecastClientService
  }
}

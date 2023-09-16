// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Weather, WeatherData, WeatherPatch, WeatherQuery, WeatherService } from './weather.class'

export type { Weather, WeatherData, WeatherPatch, WeatherQuery }

export type WeatherClientService = Pick<WeatherService<Params<WeatherQuery>>, (typeof weatherMethods)[number]>

export const weatherPath = 'weather'

export const weatherMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const weatherClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(weatherPath, connection.service(weatherPath), {
    methods: weatherMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [weatherPath]: WeatherClientService
  }
}

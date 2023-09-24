// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { WeatherService } from './weather.class'

export type WeatherClientService = Pick<WeatherService, (typeof weatherMethods)[number]>

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

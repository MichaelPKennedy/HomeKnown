// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  AirQuality,
  AirQualityData,
  AirQualityPatch,
  AirQualityQuery,
  AirQualityService
} from './air-quality.class'

export type { AirQuality, AirQualityData, AirQualityPatch, AirQualityQuery }

export type AirQualityClientService = Pick<AirQualityService, (typeof airQualityMethods)[number]>

export const airQualityPath = 'air-quality'

export const airQualityMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const airQualityClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(airQualityPath, connection.service(airQualityPath), {
    methods: airQualityMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [airQualityPath]: AirQualityClientService
  }
}

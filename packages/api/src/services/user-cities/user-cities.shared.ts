// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  UserCities,
  UserCitiesData,
  UserCitiesPatch,
  UserCitiesQuery,
  UserCitiesService
} from './user-cities.class'

export type { UserCities, UserCitiesData, UserCitiesPatch, UserCitiesQuery }

export type UserCitiesClientService = Pick<UserCitiesService, (typeof userCitiesMethods)[number]>
export const userCitiesPath = 'user-cities'

export const userCitiesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const userCitiesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userCitiesPath, connection.service(userCitiesPath), {
    methods: userCitiesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userCitiesPath]: UserCitiesClientService
  }
}

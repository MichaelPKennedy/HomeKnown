// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  PublicServices,
  PublicServicesData,
  PublicServicesPatch,
  PublicServicesQuery,
  PublicServicesService
} from './public-services.class'

export type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery }

export type PublicServicesClientService = Pick<PublicServicesService, (typeof publicServicesMethods)[number]>
export const publicServicesPath = 'public-services'

export const publicServicesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const publicServicesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(publicServicesPath, connection.service(publicServicesPath), {
    methods: publicServicesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [publicServicesPath]: PublicServicesClientService
  }
}

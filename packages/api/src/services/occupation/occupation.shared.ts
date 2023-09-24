// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { OccupationService } from './occupation.class'

export type OccupationClientService = Pick<OccupationService, (typeof occupationMethods)[number]>

export const occupationPath = '/occupation'

export const occupationMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const occupationClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(occupationPath, connection.service(occupationPath), {
    methods: occupationMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [occupationPath]: OccupationClientService
  }
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Recreation, RecreationData, RecreationPatch, RecreationService } from './recreation.class'

export type { Recreation, RecreationData, RecreationPatch }

export type RecreationClientService = Pick<RecreationService, (typeof recreationMethods)[number]>

export const recreationPath = 'recreation'

export const recreationMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const recreationClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(recreationPath, connection.service(recreationPath), {
    methods: recreationMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [recreationPath]: RecreationClientService
  }
}

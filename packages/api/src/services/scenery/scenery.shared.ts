// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Scenery, SceneryData, SceneryPatch, SceneryQuery, SceneryService } from './scenery.class'

export type { Scenery, SceneryData, SceneryPatch, SceneryQuery }

export type SceneryClientService = Pick<SceneryService, (typeof sceneryMethods)[number]>
export const sceneryPath = 'scenery'

export const sceneryMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const sceneryClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(sceneryPath, connection.service(sceneryPath), {
    methods: sceneryMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [sceneryPath]: SceneryClientService
  }
}

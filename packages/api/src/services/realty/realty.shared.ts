// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Realty, RealtyData, RealtyPatch, RealtyQuery, RealtyService } from './realty.class'

export type { Realty, RealtyData, RealtyPatch, RealtyQuery }

export type RealtyClientService = Pick<RealtyService, (typeof realtyMethods)[number]>

export const realtyPath = 'realty'

export const realtyMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const realtyClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(realtyPath, connection.service(realtyPath), {
    methods: realtyMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [realtyPath]: RealtyClientService
  }
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Cost, CostData, CostPatch, CostQuery, CostService } from './cost.class'

export type { Cost, CostData, CostPatch, CostQuery }

export type CostClientService = Pick<CostService, (typeof costMethods)[number]>

export const costPath = 'cost'

export const costMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const costClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(costPath, connection.service(costPath), {
    methods: costMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [costPath]: CostClientService
  }
}

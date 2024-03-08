// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Stats, StatsData, StatsPatch, StatsQuery, StatsService } from './stats.class'

export type { Stats, StatsData, StatsPatch, StatsQuery }

export type StatsClientService = Pick<StatsService, (typeof statsMethods)[number]>
export const statsPath = 'stats'

export const statsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const statsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(statsPath, connection.service(statsPath), {
    methods: statsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [statsPath]: StatsClientService
  }
}

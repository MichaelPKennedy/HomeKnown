// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Crime, CrimeData, CrimePatch, CrimeQuery, CrimeService } from './crime.class'

export type { Crime, CrimeData, CrimePatch, CrimeQuery }

export type CrimeClientService = Pick<CrimeService, (typeof crimeMethods)[number]>

export const crimePath = 'crime'

export const crimeMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const crimeClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(crimePath, connection.service(crimePath), {
    methods: crimeMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [crimePath]: CrimeClientService
  }
}

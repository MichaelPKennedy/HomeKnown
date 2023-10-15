// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Housing, HousingData, HousingPatch, HousingQuery, HousingService } from './housing.class'

export type { Housing, HousingData, HousingPatch, HousingQuery }

export type HousingClientService = Pick<HousingService<Params<HousingQuery>>, (typeof housingMethods)[number]>

export const housingPath = 'housing'

export const housingMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const housingClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(housingPath, connection.service(housingPath), {
    methods: housingMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [housingPath]: HousingClientService
  }
}

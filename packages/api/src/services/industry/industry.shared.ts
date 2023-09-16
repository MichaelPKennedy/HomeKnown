// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Industry, IndustryData, IndustryPatch, IndustryQuery, IndustryService } from './industry.class'

export type { Industry, IndustryData, IndustryPatch, IndustryQuery }

export type IndustryClientService = Pick<
  IndustryService<Params<IndustryQuery>>,
  (typeof industryMethods)[number]
>

export const industryPath = 'industry'

export const industryMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const industryClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(industryPath, connection.service(industryPath), {
    methods: industryMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [industryPath]: IndustryClientService
  }
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Search, SearchData, SearchPatch, SearchQuery, SearchService } from './search.class'

export type { Search, SearchData, SearchPatch, SearchQuery }

export type SearchClientService = Pick<SearchService, (typeof searchMethods)[number]>
export const searchPath = 'search'

export const searchMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const searchClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(searchPath, connection.service(searchPath), {
    methods: searchMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [searchPath]: SearchClientService
  }
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Places, PlacesData, PlacesPatch, PlacesQuery, PlacesService } from './places.class'

export type { Places, PlacesData, PlacesPatch, PlacesQuery }

export type PlacesClientService = Pick<PlacesService<Params<PlacesQuery>>, (typeof placesMethods)[number]>

export const placesPath = '/places'

export const placesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const placesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(placesPath, connection.service(placesPath), {
    methods: placesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [placesPath]: PlacesClientService
  }
}

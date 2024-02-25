// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Photos, PhotosData, PhotosPatch, PhotosQuery, PhotosService } from './photos.class'

export type { Photos, PhotosData, PhotosPatch, PhotosQuery }

export type PhotosClientService = Pick<PhotosService, (typeof photosMethods)[number]>
export const photosPath = 'photos'

export const photosMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const photosClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(photosPath, connection.service(photosPath), {
    methods: photosMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [photosPath]: PhotosClientService
  }
}

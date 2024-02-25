// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { PhotosService } from './photos.class'
import { photosPath, photosMethods } from './photos.shared'
import { photosHooks } from './photos.hooks'

export * from './photos.class'
export * from './photos.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const photos = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(photosPath, new PhotosService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: photosMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(photosPath).hooks(photosHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [photosPath]: PhotosService
  }
}

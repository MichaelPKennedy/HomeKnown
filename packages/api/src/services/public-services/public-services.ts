// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { PublicServicesService } from './public-services.class'
import { publicServicesPath, publicServicesMethods } from './public-services.shared'
import { publicServicesHooks } from './public-services.hooks'

export * from './public-services.class'
export * from './public-services.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const publicServices = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(publicServicesPath, new PublicServicesService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: publicServicesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(publicServicesPath).hooks(publicServicesHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [publicServicesPath]: PublicServicesService
  }
}

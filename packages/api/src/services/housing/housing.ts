// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { HousingService } from './housing.class'
import { housingPath, housingMethods } from './housing.shared'
import { housingHooks } from './housing.hooks'

export * from './housing.class'
export * from './housing.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const housing = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(housingPath, new HousingService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: housingMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(housingPath).hooks(housingHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [housingPath]: HousingService
  }
}

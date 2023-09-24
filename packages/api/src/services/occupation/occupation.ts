// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { OccupationService, getOptions } from './occupation.class'
import { occupationPath, occupationMethods } from './occupation.shared'
import { occupationHooks } from './occupation.hooks'

export * from './occupation.class'
export * from './occupation.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const occupation = (app: Application) => {
  // Register our service on the Feathers application
  app.use(occupationPath, new OccupationService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: occupationMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(occupationPath).hooks(occupationHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [occupationPath]: OccupationService
  }
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { RealtyService } from './realty.class'
import { realtyPath, realtyMethods } from './realty.shared'
import { realtyHooks } from './realty.hooks'

export * from './realty.class'
export * from './realty.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const realty = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(realtyPath, new RealtyService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: realtyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(realtyPath).hooks(realtyHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [realtyPath]: RealtyService
  }
}

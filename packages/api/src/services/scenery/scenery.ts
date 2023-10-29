// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { SceneryService } from './scenery.class'
import { sceneryPath, sceneryMethods } from './scenery.shared'
import { sceneryHooks } from './scenery.hooks'

export * from './scenery.class'
export * from './scenery.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const scenery = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(sceneryPath, new SceneryService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: sceneryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(sceneryPath).hooks(sceneryHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [sceneryPath]: SceneryService
  }
}

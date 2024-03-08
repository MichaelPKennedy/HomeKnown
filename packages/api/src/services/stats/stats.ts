// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { StatsService } from './stats.class'
import { statsPath, statsMethods } from './stats.shared'
import { statsHooks } from './stats.hooks'

export * from './stats.class'
export * from './stats.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const stats = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(statsPath, new StatsService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: statsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(statsPath).hooks(statsHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [statsPath]: StatsService
  }
}

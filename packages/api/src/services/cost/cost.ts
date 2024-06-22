// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { CostService } from './cost.class'
import { costPath, costMethods } from './cost.shared'
import { costHooks } from './cost.hooks'

export * from './cost.class'
export * from './cost.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const cost = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(costPath, new CostService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: costMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(costPath).hooks(costHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [costPath]: CostService
  }
}

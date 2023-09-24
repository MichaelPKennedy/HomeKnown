// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { IndustryService } from './industry.class'
import { industryPath, industryMethods } from './industry.shared'
import { industryHooks } from './industry.hooks'

export * from './industry.class'
export * from './industry.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const industry = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(industryPath, new IndustryService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: industryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(industryPath).hooks(industryHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [industryPath]: IndustryService
  }
}

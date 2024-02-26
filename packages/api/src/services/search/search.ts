// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { SearchService } from './search.class'
import { searchPath, searchMethods } from './search.shared'
import { searchHooks } from './search.hooks'

export * from './search.class'
export * from './search.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const search = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(searchPath, new SearchService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: searchMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(searchPath).hooks(searchHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [searchPath]: SearchService
  }
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { CategoriesService } from './categories.class'
import { categoriesPath, categoriesMethods } from './categories.shared'
import { categoriesHooks } from './categories.hooks'

export * from './categories.class'
export * from './categories.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const categories = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(categoriesPath, new CategoriesService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: categoriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(categoriesPath).hooks(categoriesHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [categoriesPath]: CategoriesService
  }
}

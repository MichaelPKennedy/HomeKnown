// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { UserCitiesService } from './user-cities.class'
import { userCitiesPath, userCitiesMethods } from './user-cities.shared'
import { userCitiesHooks } from './user-cities.hooks'

export * from './user-cities.class'
export * from './user-cities.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const userCities = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(userCitiesPath, new UserCitiesService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: userCitiesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(userCitiesPath).hooks(userCitiesHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userCitiesPath]: UserCitiesService
  }
}

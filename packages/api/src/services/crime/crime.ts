// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { CrimeService } from './crime.class'
import { crimePath, crimeMethods } from './crime.shared'
import { crimeHooks } from './crime.hooks'

export * from './crime.class'
export * from './crime.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const crime = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(crimePath, new CrimeService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: crimeMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(crimePath).hooks(crimeHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [crimePath]: CrimeService
  }
}

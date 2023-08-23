import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  placesDataValidator,
  placesPatchValidator,
  placesQueryValidator,
  placesResolver,
  placesExternalResolver,
  placesDataResolver,
  placesPatchResolver,
  placesQueryResolver
} from './places.schema'

import type { Application } from '../../declarations'
import { PlacesService } from './places.class'
import { placesPath, placesMethods } from './places.shared'

export * from './places.class'
export * from './places.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const places = (app: Application) => {
  // Register our service on the Feathers application
  app.use(placesPath, new PlacesService(app), {
    // A list of all methods this service exposes externally
    methods: placesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(placesPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(placesExternalResolver), schemaHooks.resolveResult(placesResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(placesQueryValidator), schemaHooks.resolveQuery(placesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(placesDataValidator), schemaHooks.resolveData(placesDataResolver)],
      patch: [schemaHooks.validateData(placesPatchValidator), schemaHooks.resolveData(placesPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [placesPath]: PlacesService
  }
}

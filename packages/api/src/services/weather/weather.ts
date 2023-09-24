// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  weatherDataValidator,
  weatherPatchValidator,
  weatherQueryValidator,
  weatherResolver,
  weatherExternalResolver,
  weatherDataResolver,
  weatherPatchResolver,
  weatherQueryResolver
} from './weather.schema'

import type { Application } from '../../declarations'
import { WeatherService } from './weather.class'
import { weatherPath, weatherMethods } from './weather.shared'

export * from './weather.class'
export * from './weather.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const weather = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(weatherPath, new WeatherService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: weatherMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(weatherPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(weatherExternalResolver), schemaHooks.resolveResult(weatherResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(weatherQueryValidator), schemaHooks.resolveQuery(weatherQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(weatherDataValidator), schemaHooks.resolveData(weatherDataResolver)],
      patch: [schemaHooks.validateData(weatherPatchValidator), schemaHooks.resolveData(weatherPatchResolver)],
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
    [weatherPath]: WeatherService
  }
}

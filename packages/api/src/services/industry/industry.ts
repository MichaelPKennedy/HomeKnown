// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  industryDataValidator,
  industryPatchValidator,
  industryQueryValidator,
  industryResolver,
  industryExternalResolver,
  industryDataResolver,
  industryPatchResolver,
  industryQueryResolver
} from './industry.schema'

import type { Application } from '../../declarations'
import { IndustryService, getOptions } from './industry.class'
import { industryPath, industryMethods } from './industry.shared'

export * from './industry.class'
export * from './industry.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const industry = (app: Application) => {
  // Register our service on the Feathers application
  app.use(industryPath, new IndustryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: industryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(industryPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(industryExternalResolver),
        schemaHooks.resolveResult(industryResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(industryQueryValidator),
        schemaHooks.resolveQuery(industryQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(industryDataValidator),
        schemaHooks.resolveData(industryDataResolver)
      ],
      patch: [
        schemaHooks.validateData(industryPatchValidator),
        schemaHooks.resolveData(industryPatchResolver)
      ],
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
    [industryPath]: IndustryService
  }
}

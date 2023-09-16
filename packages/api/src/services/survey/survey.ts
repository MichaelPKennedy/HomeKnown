// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  surveyDataValidator,
  surveyPatchValidator,
  surveyQueryValidator,
  surveyResolver,
  surveyExternalResolver,
  surveyDataResolver,
  surveyPatchResolver,
  surveyQueryResolver
} from './survey.schema'

import type { Application } from '../../declarations'
import { SurveyService, getOptions } from './survey.class'
import { surveyPath, surveyMethods } from './survey.shared'

export * from './survey.class'
export * from './survey.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const survey = (app: Application) => {
  // Register our service on the Feathers application
  app.use(surveyPath, new SurveyService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: surveyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(surveyPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(surveyExternalResolver), schemaHooks.resolveResult(surveyResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(surveyQueryValidator), schemaHooks.resolveQuery(surveyQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(surveyDataValidator), schemaHooks.resolveData(surveyDataResolver)],
      patch: [schemaHooks.validateData(surveyPatchValidator), schemaHooks.resolveData(surveyPatchResolver)],
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
    [surveyPath]: SurveyService
  }
}

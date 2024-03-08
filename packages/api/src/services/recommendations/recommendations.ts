// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { RecommendationsService } from './recommendations.class'
import { recommendationsPath, recommendationsMethods } from './recommendations.shared'
import { recommendationsHooks } from './recommendations.hooks'

export * from './recommendations.class'
export * from './recommendations.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const recommendations = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(recommendationsPath, new RecommendationsService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: recommendationsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(recommendationsPath).hooks(recommendationsHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [recommendationsPath]: RecommendationsService
  }
}

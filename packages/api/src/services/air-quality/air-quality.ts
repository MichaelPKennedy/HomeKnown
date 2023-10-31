// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { AirQualityService } from './air-quality.class'
import { airQualityPath, airQualityMethods } from './air-quality.shared'
import { airQualityHooks } from './air-quality.hooks'

export * from './air-quality.class'
export * from './air-quality.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const airQuality = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(airQualityPath, new AirQualityService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: airQualityMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(airQualityPath).hooks(airQualityHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [airQualityPath]: AirQualityService
  }
}

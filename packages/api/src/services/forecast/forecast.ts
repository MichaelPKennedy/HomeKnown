// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { ForecastService } from './forecast.class'
import { forecastPath, forecastMethods } from './forecast.shared'
import { forecastHooks } from './forecast.hooks'

export * from './forecast.class'
export * from './forecast.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const forecast = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(forecastPath, new ForecastService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: forecastMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(forecastPath).hooks(forecastHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [forecastPath]: ForecastService
  }
}

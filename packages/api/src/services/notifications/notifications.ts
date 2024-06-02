// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { NotificationsService } from './notifications.class'
import { notificationsPath, notificationsMethods } from './notifications.shared'
import { notificationsHooks } from './notifications.hooks'

export * from './notifications.class'
export * from './notifications.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const notifications = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(notificationsPath, new NotificationsService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: notificationsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(notificationsPath).hooks(notificationsHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [notificationsPath]: NotificationsService
  }
}

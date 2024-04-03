// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { ForgotPasswordService } from './forgot-password.class'
import { forgotPasswordPath, forgotPasswordMethods } from './forgot-password.shared'
import { forgotPasswordHooks } from './forgot-password.hooks'

export * from './forgot-password.class'
export * from './forgot-password.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const forgotPassword = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(forgotPasswordPath, new ForgotPasswordService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: forgotPasswordMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(forgotPasswordPath).hooks(forgotPasswordHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [forgotPasswordPath]: ForgotPasswordService
  }
}

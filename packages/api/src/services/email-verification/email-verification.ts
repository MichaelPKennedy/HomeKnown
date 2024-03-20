// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { EmailVerificationService } from './email-verification.class'
import { emailVerificationPath, emailVerificationMethods } from './email-verification.shared'
import { emailVerificationHooks } from './email-verification.hooks'

export * from './email-verification.class'
export * from './email-verification.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const emailVerification = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(emailVerificationPath, new EmailVerificationService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: emailVerificationMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(emailVerificationPath).hooks(emailVerificationHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [emailVerificationPath]: EmailVerificationService
  }
}

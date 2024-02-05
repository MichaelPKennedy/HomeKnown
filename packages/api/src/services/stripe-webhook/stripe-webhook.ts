// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { StripeWebhookService } from './stripe-webhook.class'
import { stripeWebhookPath, stripeWebhookMethods } from './stripe-webhook.shared'
import { stripeWebhookHooks } from './stripe-webhook.hooks'

export * from './stripe-webhook.class'
export * from './stripe-webhook.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const stripeWebhook = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(stripeWebhookPath, new StripeWebhookService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: stripeWebhookMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(stripeWebhookPath).hooks(stripeWebhookHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [stripeWebhookPath]: StripeWebhookService
  }
}

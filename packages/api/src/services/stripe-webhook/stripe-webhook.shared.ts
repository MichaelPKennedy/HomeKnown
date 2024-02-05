// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  StripeWebhook,
  StripeWebhookData,
  StripeWebhookPatch,
  StripeWebhookQuery,
  StripeWebhookService
} from './stripe-webhook.class'

export type { StripeWebhook, StripeWebhookData, StripeWebhookPatch, StripeWebhookQuery }

export type StripeWebhookClientService = Pick<StripeWebhookService, (typeof stripeWebhookMethods)[number]>
export const stripeWebhookPath = 'stripe-webhook'

export const stripeWebhookMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const stripeWebhookClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(stripeWebhookPath, connection.service(stripeWebhookPath), {
    methods: stripeWebhookMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [stripeWebhookPath]: StripeWebhookClientService
  }
}

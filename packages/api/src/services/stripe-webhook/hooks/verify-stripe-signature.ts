import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { StripeWebhookService } from '../stripe-webhook.class'

const stripe = require('stripe')(process.env.STRIPE_TEST_SK)
const { NotAuthenticated } = require('@feathersjs/errors')

const nearbyIndustryData: Hook<Application, StripeWebhookService> = async (
  context: HookContext<Application, StripeWebhookService>
): Promise<HookContext<Application, StripeWebhookService>> => {
  const { req } = context.params
  const sigHeader = req.headers['stripe-signature']

  try {
    // Construct the event using the Stripe library to validate the signature
    const event = stripe.webhooks.constructEvent(req.body, sigHeader, process.env.STRIPE_WEBHOOK_SECRET)

    // Attach the event to the context so it can be accessed in later hooks or the service method
    context.data = event
  } catch (err: any) {
    throw new NotAuthenticated('Unable to verify Stripe signature', {
      errors: { stripe: err.message }
    })
  }

  return context
}

export default nearbyIndustryData

import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { StripeWebhookService } from '../stripe-webhook.class'
const process = require('process')

const stripe = require('stripe')(process.env.STRIPE_TEST_SK)
const { NotAuthenticated } = require('@feathersjs/errors')
const endpointSecret = process.env.TEST_STRIPE_ENDPOINT_SECRET

const verifyStripeSignature: Hook<Application, StripeWebhookService> = async (
  context: HookContext<Application, StripeWebhookService>
): Promise<HookContext<Application, StripeWebhookService>> => {
  const { req } = context.params
  const sigHeader = req?.headers['stripe-signature'] || context.arguments[1].headers['stripe-signature']
  const body = req?.body || context.arguments[1].rawBody
  try {
    // Construct the event using the Stripe library to validate the signature
    const event = stripe.webhooks.constructEvent(body, sigHeader, endpointSecret)

    // Attach the event to the context so it can be accessed in later hooks or the service method
    context.data = event
    console.log('Stripe event data:', event)
  } catch (err: any) {
    throw new NotAuthenticated('Unable to verify Stripe signature', {
      errors: { stripe: err }
    })
  }

  return context
}

export default verifyStripeSignature

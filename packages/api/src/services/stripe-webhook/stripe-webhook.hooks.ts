import verifyStripeSignature from './hooks/verify-stripe-signature'

export const stripeWebhookHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [verifyStripeSignature],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}

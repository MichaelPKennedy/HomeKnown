// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const stripeWebhookSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'StripeWebhook', additionalProperties: false }
)
export type StripeWebhook = Static<typeof stripeWebhookSchema>
export const stripeWebhookValidator = getValidator(stripeWebhookSchema, dataValidator)
export const stripeWebhookResolver = resolve<StripeWebhook, HookContext>({})

export const stripeWebhookExternalResolver = resolve<StripeWebhook, HookContext>({})

// Schema for creating new entries
export const stripeWebhookDataSchema = Type.Pick(stripeWebhookSchema, ['text'], {
  $id: 'StripeWebhookData'
})
export type StripeWebhookData = Static<typeof stripeWebhookDataSchema>
export const stripeWebhookDataValidator = getValidator(stripeWebhookDataSchema, dataValidator)
export const stripeWebhookDataResolver = resolve<StripeWebhook, HookContext>({})

// Schema for updating existing entries
export const stripeWebhookPatchSchema = Type.Partial(stripeWebhookSchema, {
  $id: 'StripeWebhookPatch'
})
export type StripeWebhookPatch = Static<typeof stripeWebhookPatchSchema>
export const stripeWebhookPatchValidator = getValidator(stripeWebhookPatchSchema, dataValidator)
export const stripeWebhookPatchResolver = resolve<StripeWebhook, HookContext>({})

// Schema for allowed query properties
export const stripeWebhookQueryProperties = Type.Pick(stripeWebhookSchema, ['id', 'text'])
export const stripeWebhookQuerySchema = Type.Intersect(
  [
    querySyntax(stripeWebhookQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type StripeWebhookQuery = Static<typeof stripeWebhookQuerySchema>
export const stripeWebhookQueryValidator = getValidator(stripeWebhookQuerySchema, queryValidator)
export const stripeWebhookQueryResolver = resolve<StripeWebhookQuery, HookContext>({})

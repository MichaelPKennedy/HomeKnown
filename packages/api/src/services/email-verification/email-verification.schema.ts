// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const emailVerificationSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'EmailVerification', additionalProperties: false }
)
export type EmailVerification = Static<typeof emailVerificationSchema>
export const emailVerificationValidator = getValidator(emailVerificationSchema, dataValidator)
export const emailVerificationResolver = resolve<EmailVerification, HookContext>({})

export const emailVerificationExternalResolver = resolve<EmailVerification, HookContext>({})

// Schema for creating new entries
export const emailVerificationDataSchema = Type.Pick(emailVerificationSchema, ['text'], {
  $id: 'EmailVerificationData'
})
export type EmailVerificationData = Static<typeof emailVerificationDataSchema>
export const emailVerificationDataValidator = getValidator(emailVerificationDataSchema, dataValidator)
export const emailVerificationDataResolver = resolve<EmailVerification, HookContext>({})

// Schema for updating existing entries
export const emailVerificationPatchSchema = Type.Partial(emailVerificationSchema, {
  $id: 'EmailVerificationPatch'
})
export type EmailVerificationPatch = Static<typeof emailVerificationPatchSchema>
export const emailVerificationPatchValidator = getValidator(emailVerificationPatchSchema, dataValidator)
export const emailVerificationPatchResolver = resolve<EmailVerification, HookContext>({})

// Schema for allowed query properties
export const emailVerificationQueryProperties = Type.Pick(emailVerificationSchema, ['id', 'text'])
export const emailVerificationQuerySchema = Type.Intersect(
  [
    querySyntax(emailVerificationQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EmailVerificationQuery = Static<typeof emailVerificationQuerySchema>
export const emailVerificationQueryValidator = getValidator(emailVerificationQuerySchema, queryValidator)
export const emailVerificationQueryResolver = resolve<EmailVerificationQuery, HookContext>({})

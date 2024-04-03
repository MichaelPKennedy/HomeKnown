// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const forgotPasswordSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'ForgotPassword', additionalProperties: false }
)
export type ForgotPassword = Static<typeof forgotPasswordSchema>
export const forgotPasswordValidator = getValidator(forgotPasswordSchema, dataValidator)
export const forgotPasswordResolver = resolve<ForgotPassword, HookContext>({})

export const forgotPasswordExternalResolver = resolve<ForgotPassword, HookContext>({})

// Schema for creating new entries
export const forgotPasswordDataSchema = Type.Pick(forgotPasswordSchema, ['text'], {
  $id: 'ForgotPasswordData'
})
export type ForgotPasswordData = Static<typeof forgotPasswordDataSchema>
export const forgotPasswordDataValidator = getValidator(forgotPasswordDataSchema, dataValidator)
export const forgotPasswordDataResolver = resolve<ForgotPassword, HookContext>({})

// Schema for updating existing entries
export const forgotPasswordPatchSchema = Type.Partial(forgotPasswordSchema, {
  $id: 'ForgotPasswordPatch'
})
export type ForgotPasswordPatch = Static<typeof forgotPasswordPatchSchema>
export const forgotPasswordPatchValidator = getValidator(forgotPasswordPatchSchema, dataValidator)
export const forgotPasswordPatchResolver = resolve<ForgotPassword, HookContext>({})

// Schema for allowed query properties
export const forgotPasswordQueryProperties = Type.Pick(forgotPasswordSchema, ['id', 'text'])
export const forgotPasswordQuerySchema = Type.Intersect(
  [
    querySyntax(forgotPasswordQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ForgotPasswordQuery = Static<typeof forgotPasswordQuerySchema>
export const forgotPasswordQueryValidator = getValidator(forgotPasswordQuerySchema, queryValidator)
export const forgotPasswordQueryResolver = resolve<ForgotPasswordQuery, HookContext>({})

// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const realtySchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Realty', additionalProperties: false }
)
export type Realty = Static<typeof realtySchema>
export const realtyValidator = getValidator(realtySchema, dataValidator)
export const realtyResolver = resolve<Realty, HookContext>({})

export const realtyExternalResolver = resolve<Realty, HookContext>({})

// Schema for creating new entries
export const realtyDataSchema = Type.Pick(realtySchema, ['text'], {
  $id: 'RealtyData'
})
export type RealtyData = Static<typeof realtyDataSchema>
export const realtyDataValidator = getValidator(realtyDataSchema, dataValidator)
export const realtyDataResolver = resolve<Realty, HookContext>({})

// Schema for updating existing entries
export const realtyPatchSchema = Type.Partial(realtySchema, {
  $id: 'RealtyPatch'
})
export type RealtyPatch = Static<typeof realtyPatchSchema>
export const realtyPatchValidator = getValidator(realtyPatchSchema, dataValidator)
export const realtyPatchResolver = resolve<Realty, HookContext>({})

// Schema for allowed query properties
export const realtyQueryProperties = Type.Pick(realtySchema, ['id', 'text'])
export const realtyQuerySchema = Type.Intersect(
  [
    querySyntax(realtyQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RealtyQuery = Static<typeof realtyQuerySchema>
export const realtyQueryValidator = getValidator(realtyQuerySchema, queryValidator)
export const realtyQueryResolver = resolve<RealtyQuery, HookContext>({})

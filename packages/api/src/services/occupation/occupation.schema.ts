// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const occupationSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Occupation', additionalProperties: false }
)
export type Occupation = Static<typeof occupationSchema>
export const occupationValidator = getValidator(occupationSchema, dataValidator)
export const occupationResolver = resolve<Occupation, HookContext>({})

export const occupationExternalResolver = resolve<Occupation, HookContext>({})

// Schema for creating new entries
export const occupationDataSchema = Type.Pick(occupationSchema, ['text'], {
  $id: 'OccupationData'
})
export type OccupationData = Static<typeof occupationDataSchema>
export const occupationDataValidator = getValidator(occupationDataSchema, dataValidator)
export const occupationDataResolver = resolve<Occupation, HookContext>({})

// Schema for updating existing entries
export const occupationPatchSchema = Type.Partial(occupationSchema, {
  $id: 'OccupationPatch'
})
export type OccupationPatch = Static<typeof occupationPatchSchema>
export const occupationPatchValidator = getValidator(occupationPatchSchema, dataValidator)
export const occupationPatchResolver = resolve<Occupation, HookContext>({})

// Schema for allowed query properties
export const occupationQueryProperties = Type.Pick(occupationSchema, ['id', 'text'])
export const occupationQuerySchema = Type.Intersect(
  [
    querySyntax(occupationQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OccupationQuery = Static<typeof occupationQuerySchema>
export const occupationQueryValidator = getValidator(occupationQuerySchema, queryValidator)
export const occupationQueryResolver = resolve<OccupationQuery, HookContext>({})

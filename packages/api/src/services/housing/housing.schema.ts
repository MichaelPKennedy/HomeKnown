// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const housingSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Housing', additionalProperties: false }
)
export type Housing = Static<typeof housingSchema>
export const housingValidator = getValidator(housingSchema, dataValidator)
export const housingResolver = resolve<Housing, HookContext>({})

export const housingExternalResolver = resolve<Housing, HookContext>({})

// Schema for creating new entries
export const housingDataSchema = Type.Pick(housingSchema, ['text'], {
  $id: 'HousingData'
})
export type HousingData = Static<typeof housingDataSchema>
export const housingDataValidator = getValidator(housingDataSchema, dataValidator)
export const housingDataResolver = resolve<Housing, HookContext>({})

// Schema for updating existing entries
export const housingPatchSchema = Type.Partial(housingSchema, {
  $id: 'HousingPatch'
})
export type HousingPatch = Static<typeof housingPatchSchema>
export const housingPatchValidator = getValidator(housingPatchSchema, dataValidator)
export const housingPatchResolver = resolve<Housing, HookContext>({})

// Schema for allowed query properties
export const housingQueryProperties = Type.Pick(housingSchema, ['id', 'text'])
export const housingQuerySchema = Type.Intersect(
  [
    querySyntax(housingQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type HousingQuery = Static<typeof housingQuerySchema>
export const housingQueryValidator = getValidator(housingQuerySchema, queryValidator)
export const housingQueryResolver = resolve<HousingQuery, HookContext>({})

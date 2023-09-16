// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const industrySchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Industry', additionalProperties: false }
)
export type Industry = Static<typeof industrySchema>
export const industryValidator = getValidator(industrySchema, dataValidator)
export const industryResolver = resolve<Industry, HookContext>({})

export const industryExternalResolver = resolve<Industry, HookContext>({})

// Schema for creating new entries
export const industryDataSchema = Type.Pick(industrySchema, ['text'], {
  $id: 'IndustryData'
})
export type IndustryData = Static<typeof industryDataSchema>
export const industryDataValidator = getValidator(industryDataSchema, dataValidator)
export const industryDataResolver = resolve<Industry, HookContext>({})

// Schema for updating existing entries
export const industryPatchSchema = Type.Partial(industrySchema, {
  $id: 'IndustryPatch'
})
export type IndustryPatch = Static<typeof industryPatchSchema>
export const industryPatchValidator = getValidator(industryPatchSchema, dataValidator)
export const industryPatchResolver = resolve<Industry, HookContext>({})

// Schema for allowed query properties
export const industryQueryProperties = Type.Pick(industrySchema, ['id', 'text'])
export const industryQuerySchema = Type.Intersect(
  [
    querySyntax(industryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type IndustryQuery = Static<typeof industryQuerySchema>
export const industryQueryValidator = getValidator(industryQuerySchema, queryValidator)
export const industryQueryResolver = resolve<IndustryQuery, HookContext>({})

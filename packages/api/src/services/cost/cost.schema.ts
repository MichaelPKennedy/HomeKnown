// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const costSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Cost', additionalProperties: false }
)
export type Cost = Static<typeof costSchema>
export const costValidator = getValidator(costSchema, dataValidator)
export const costResolver = resolve<Cost, HookContext>({})

export const costExternalResolver = resolve<Cost, HookContext>({})

// Schema for creating new entries
export const costDataSchema = Type.Pick(costSchema, ['text'], {
  $id: 'CostData'
})
export type CostData = Static<typeof costDataSchema>
export const costDataValidator = getValidator(costDataSchema, dataValidator)
export const costDataResolver = resolve<Cost, HookContext>({})

// Schema for updating existing entries
export const costPatchSchema = Type.Partial(costSchema, {
  $id: 'CostPatch'
})
export type CostPatch = Static<typeof costPatchSchema>
export const costPatchValidator = getValidator(costPatchSchema, dataValidator)
export const costPatchResolver = resolve<Cost, HookContext>({})

// Schema for allowed query properties
export const costQueryProperties = Type.Pick(costSchema, ['id', 'text'])
export const costQuerySchema = Type.Intersect(
  [
    querySyntax(costQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CostQuery = Static<typeof costQuerySchema>
export const costQueryValidator = getValidator(costQuerySchema, queryValidator)
export const costQueryResolver = resolve<CostQuery, HookContext>({})

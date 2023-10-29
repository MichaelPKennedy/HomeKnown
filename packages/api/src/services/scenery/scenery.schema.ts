// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const scenerySchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Scenery', additionalProperties: false }
)
export type Scenery = Static<typeof scenerySchema>
export const sceneryValidator = getValidator(scenerySchema, dataValidator)
export const sceneryResolver = resolve<Scenery, HookContext>({})

export const sceneryExternalResolver = resolve<Scenery, HookContext>({})

// Schema for creating new entries
export const sceneryDataSchema = Type.Pick(scenerySchema, ['text'], {
  $id: 'SceneryData'
})
export type SceneryData = Static<typeof sceneryDataSchema>
export const sceneryDataValidator = getValidator(sceneryDataSchema, dataValidator)
export const sceneryDataResolver = resolve<Scenery, HookContext>({})

// Schema for updating existing entries
export const sceneryPatchSchema = Type.Partial(scenerySchema, {
  $id: 'SceneryPatch'
})
export type SceneryPatch = Static<typeof sceneryPatchSchema>
export const sceneryPatchValidator = getValidator(sceneryPatchSchema, dataValidator)
export const sceneryPatchResolver = resolve<Scenery, HookContext>({})

// Schema for allowed query properties
export const sceneryQueryProperties = Type.Pick(scenerySchema, ['id', 'text'])
export const sceneryQuerySchema = Type.Intersect(
  [
    querySyntax(sceneryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SceneryQuery = Static<typeof sceneryQuerySchema>
export const sceneryQueryValidator = getValidator(sceneryQuerySchema, queryValidator)
export const sceneryQueryResolver = resolve<SceneryQuery, HookContext>({})

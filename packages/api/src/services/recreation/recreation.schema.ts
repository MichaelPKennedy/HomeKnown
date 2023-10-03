import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { resolve } from '@feathersjs/schema'

// Main data model schema
export const recreationSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Recreation', additionalProperties: true }
)
export type Recreation = Static<typeof recreationSchema>
export const recreationValidator = getValidator(recreationSchema, dataValidator)
export const recreationResolver = resolve<Recreation, HookContext>({})

export const recreationExternalResolver = resolve<Recreation, HookContext>({})

// Schema for creating new entries
export const recreationDataSchema = Type.Pick(recreationSchema, ['text'], {
  $id: 'RecreationData'
})
export type RecreationData = Static<typeof recreationDataSchema>
export const recreationDataValidator = getValidator(recreationDataSchema, dataValidator)
export const recreationDataResolver = resolve<Recreation, HookContext>({})

// Schema for updating existing entries
export const recreationPatchSchema = Type.Partial(recreationSchema, {
  $id: 'RecreationPatch'
})
export type RecreationPatch = Static<typeof recreationPatchSchema>
export const recreationPatchValidator = getValidator(recreationPatchSchema, dataValidator)
export const recreationPatchResolver = resolve<Recreation, HookContext>({})

// Define RecreationalInterestKey in schema
export type RecreationalInterestKey =
  | 'mountains'
  | 'nationalParks'
  | 'forests'
  | 'waterfrontViews'
  | 'scenicDrives'
  | 'historicSites'
  | 'monuments'
  | 'museums'
  | 'naturalWonders'
  | 'rockClimbing'
  | 'waterSports'
  | 'beach'
  | 'diverseFloraFauna'
  | 'birdWatching'
  | 'zoos'
  | 'winterSports'
  | 'stargazing'
  | 'amusementParks'

// Schema for allowed query properties
export const recreationQueryProperties = Type.Pick(recreationSchema, ['id', 'text'])
export const recreationQuerySchema = Type.Intersect(
  [
    querySyntax(recreationQueryProperties),
    Type.Object(
      {
        recreationalInterests: Type.Optional(Type.Array(Type.String()))
      },
      { additionalProperties: true }
    )
  ],
  { additionalProperties: true }
)
export type RecreationQuery = Static<typeof recreationQuerySchema>
export const recreationQueryValidator = getValidator(recreationQuerySchema, queryValidator)
export const recreationQueryResolver = resolve<RecreationQuery, HookContext>({})

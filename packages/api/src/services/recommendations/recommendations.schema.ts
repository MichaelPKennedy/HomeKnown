// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const recommendationsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Recommendations', additionalProperties: false }
)
export type Recommendations = Static<typeof recommendationsSchema>
export const recommendationsValidator = getValidator(recommendationsSchema, dataValidator)
export const recommendationsResolver = resolve<Recommendations, HookContext>({})

export const recommendationsExternalResolver = resolve<Recommendations, HookContext>({})

// Schema for creating new entries
export const recommendationsDataSchema = Type.Pick(recommendationsSchema, ['text'], {
  $id: 'RecommendationsData'
})
export type RecommendationsData = Static<typeof recommendationsDataSchema>
export const recommendationsDataValidator = getValidator(recommendationsDataSchema, dataValidator)
export const recommendationsDataResolver = resolve<Recommendations, HookContext>({})

// Schema for updating existing entries
export const recommendationsPatchSchema = Type.Partial(recommendationsSchema, {
  $id: 'RecommendationsPatch'
})
export type RecommendationsPatch = Static<typeof recommendationsPatchSchema>
export const recommendationsPatchValidator = getValidator(recommendationsPatchSchema, dataValidator)
export const recommendationsPatchResolver = resolve<Recommendations, HookContext>({})

// Schema for allowed query properties
export const recommendationsQueryProperties = Type.Pick(recommendationsSchema, ['id', 'text'])
export const recommendationsQuerySchema = Type.Intersect(
  [
    querySyntax(recommendationsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RecommendationsQuery = Static<typeof recommendationsQuerySchema>
export const recommendationsQueryValidator = getValidator(recommendationsQuerySchema, queryValidator)
export const recommendationsQueryResolver = resolve<RecommendationsQuery, HookContext>({})

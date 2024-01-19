// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const userCitiesSchema = Type.Object(
  {
    user_id: Type.Number(),
    city_id: Type.Number()
  },
  { $id: 'UserCities', additionalProperties: false }
)
export type UserCities = Static<typeof userCitiesSchema>
export const userCitiesValidator = getValidator(userCitiesSchema, dataValidator)
export const userCitiesResolver = resolve<UserCities, HookContext>({})

export const userCitiesExternalResolver = resolve<UserCities, HookContext>({})

// Schema for creating new entries
export const userCitiesDataSchema = Type.Pick(userCitiesSchema, ['user_id', 'city_id'], {
  $id: 'UserCitiesData'
})
export type UserCitiesData = Static<typeof userCitiesDataSchema>
export const userCitiesDataValidator = getValidator(userCitiesDataSchema, dataValidator)
export const userCitiesDataResolver = resolve<UserCities, HookContext>({})

// Schema for updating existing entries
export const userCitiesPatchSchema = Type.Partial(userCitiesSchema, {
  $id: 'UserCitiesPatch'
})
export type UserCitiesPatch = Static<typeof userCitiesPatchSchema>
export const userCitiesPatchValidator = getValidator(userCitiesPatchSchema, dataValidator)
export const userCitiesPatchResolver = resolve<UserCities, HookContext>({})

// Schema for allowed query properties
export const userCitiesQueryProperties = Type.Pick(userCitiesSchema, ['user_id', 'city_id'])
export const userCitiesQuerySchema = Type.Intersect(
  [
    querySyntax(userCitiesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserCitiesQuery = Static<typeof userCitiesQuerySchema>
export const userCitiesQueryValidator = getValidator(userCitiesQuerySchema, queryValidator)
export const userCitiesQueryResolver = resolve<UserCitiesQuery, HookContext>({})

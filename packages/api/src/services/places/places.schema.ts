// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const placesSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    query: Type.String()
  },
  { $id: 'Places', additionalProperties: false }
)
export type Places = Static<typeof placesSchema>
export const placesValidator = getValidator(placesSchema, dataValidator)
export const placesResolver = resolve<Places, HookContext>({})

export const placesExternalResolver = resolve<Places, HookContext>({})

// Schema for creating new entries
export const placesDataSchema = Type.Pick(placesSchema, ['text'], {
  $id: 'PlacesData'
})
export type PlacesData = Static<typeof placesDataSchema>
export const placesDataValidator = getValidator(placesDataSchema, dataValidator)
export const placesDataResolver = resolve<Places, HookContext>({})

// Schema for updating existing entries
export const placesPatchSchema = Type.Partial(placesSchema, {
  $id: 'PlacesPatch'
})
export type PlacesPatch = Static<typeof placesPatchSchema>
export const placesPatchValidator = getValidator(placesPatchSchema, dataValidator)
export const placesPatchResolver = resolve<Places, HookContext>({})

// Schema for allowed query properties
export const placesQueryProperties = Type.Pick(placesSchema, ['id', 'text', 'query'])
export const placesQuerySchema = Type.Intersect(
  [querySyntax(placesQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)
export type PlacesQuery = Static<typeof placesQuerySchema>
export const placesQueryValidator = getValidator(placesQuerySchema, queryValidator)
export const placesQueryResolver = resolve<PlacesQuery, HookContext>({})

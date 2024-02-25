// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const photosSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Photos', additionalProperties: false }
)
export type Photos = Static<typeof photosSchema>
export const photosValidator = getValidator(photosSchema, dataValidator)
export const photosResolver = resolve<Photos, HookContext>({})

export const photosExternalResolver = resolve<Photos, HookContext>({})

// Schema for creating new entries
export const photosDataSchema = Type.Pick(photosSchema, ['text'], {
  $id: 'PhotosData'
})
export type PhotosData = Static<typeof photosDataSchema>
export const photosDataValidator = getValidator(photosDataSchema, dataValidator)
export const photosDataResolver = resolve<Photos, HookContext>({})

// Schema for updating existing entries
export const photosPatchSchema = Type.Partial(photosSchema, {
  $id: 'PhotosPatch'
})
export type PhotosPatch = Static<typeof photosPatchSchema>
export const photosPatchValidator = getValidator(photosPatchSchema, dataValidator)
export const photosPatchResolver = resolve<Photos, HookContext>({})

// Schema for allowed query properties
export const photosQueryProperties = Type.Pick(photosSchema, ['id', 'text'])
export const photosQuerySchema = Type.Intersect(
  [
    querySyntax(photosQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PhotosQuery = Static<typeof photosQuerySchema>
export const photosQueryValidator = getValidator(photosQuerySchema, queryValidator)
export const photosQueryResolver = resolve<PhotosQuery, HookContext>({})

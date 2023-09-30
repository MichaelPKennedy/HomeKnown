// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const weatherSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Weather', additionalProperties: false }
)
export type WeatherSchema = Static<typeof weatherSchema>
export const weatherValidator = getValidator(weatherSchema, dataValidator)
export const weatherResolver = resolve<WeatherSchema, HookContext>({})

export const weatherExternalResolver = resolve<WeatherSchema, HookContext>({})

// Schema for creating new entries
export const weatherDataSchema = Type.Pick(weatherSchema, ['text'], {
  $id: 'WeatherData'
})
export type WeatherData = Static<typeof weatherDataSchema>
export const weatherDataValidator = getValidator(weatherDataSchema, dataValidator)
export const weatherDataResolver = resolve<WeatherSchema, HookContext>({})

// Schema for updating existing entries
export const weatherPatchSchema = Type.Partial(weatherSchema, {
  $id: 'WeatherPatch'
})
export type WeatherPatch = Static<typeof weatherPatchSchema>
export const weatherPatchValidator = getValidator(weatherPatchSchema, dataValidator)
export const weatherPatchResolver = resolve<WeatherSchema, HookContext>({})

// Schema for allowed query properties
export const weatherQueryProperties = Type.Pick(weatherSchema, ['id', 'text'])
export const weatherQuerySchema = Type.Intersect(
  [
    querySyntax(weatherQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WeatherQuery = Static<typeof weatherQuerySchema>
export const weatherQueryValidator = getValidator(weatherQuerySchema, queryValidator)
export const weatherQueryResolver = resolve<WeatherQuery, HookContext>({})

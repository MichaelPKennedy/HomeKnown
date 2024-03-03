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
export type Weather = Static<typeof weatherSchema>
export const weatherValidator = getValidator(weatherSchema, dataValidator)
export const weatherResolver = resolve<Weather, HookContext>({})

export const weatherExternalResolver = resolve<Weather, HookContext>({})

// Schema for creating new entries
export const weatherDataSchema = Type.Pick(weatherSchema, ['text'], {
  $id: 'WeatherData'
})
export type WeatherData = Static<typeof weatherDataSchema>
export const weatherDataValidator = getValidator(weatherDataSchema, dataValidator)
export const weatherDataResolver = resolve<Weather, HookContext>({})

// Schema for updating existing entries
export const weatherPatchSchema = Type.Partial(weatherSchema, {
  $id: 'WeatherPatch'
})
export type WeatherPatch = Static<typeof weatherPatchSchema>
export const weatherPatchValidator = getValidator(weatherPatchSchema, dataValidator)
export const weatherPatchResolver = resolve<Weather, HookContext>({})

// Schema for allowed query properties
// Schema for allowed query properties
export const weatherQueryProperties = Type.Pick(weatherSchema, ['id', 'text'], {
  $id: 'WeatherQueryProperties'
})
export const weatherAdditionalQueryProperties = Type.Object(
  {
    snowPreference: Type.Optional(
      Type.Union([Type.Literal('none'), Type.Literal('light'), Type.Literal('heavy')])
    ),
    rainPreference: Type.Optional(Type.Union([Type.Literal('dry'), Type.Literal('regular')])),
    temperatureData: Type.Array(
      Type.Object({
        month: Type.String(),
        temp: Type.Optional(Type.Number())
      }),
      { minItems: 12, maxItems: 12 }
    ),
    minPopulation: Type.Optional(Type.Number()),
    maxPopulation: Type.Optional(Type.Number()),
    includedStates: Type.Optional(Type.Array(Type.Number())),
    humidityPreference: Type.Optional(Type.Number())
  },
  { additionalProperties: false }
)

export const weatherQuerySchema = Type.Intersect(
  [querySyntax(weatherQueryProperties), weatherAdditionalQueryProperties],
  { additionalProperties: false }
)

export type WeatherQuery = Static<typeof weatherQuerySchema>
export const weatherQueryValidator = getValidator(weatherQuerySchema, queryValidator)
export const weatherQueryResolver = resolve<WeatherQuery, HookContext>({})

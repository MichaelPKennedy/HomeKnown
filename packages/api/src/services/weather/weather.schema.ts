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
    Type.Object(
      {
        temperature: Type.Optional(Type.Number()),
        temperaturePreference: Type.Optional(Type.Union([Type.Literal('mild'), Type.Literal('distinct')])),
        climatePreference: Type.Optional(Type.Union([Type.Literal('warmer'), Type.Literal('cooler')])),
        snowPreference: Type.Optional(
          Type.Union([Type.Literal('none'), Type.Literal('light'), Type.Literal('heavy')])
        ),
        rainPreference: Type.Optional(Type.Union([Type.Literal('dry'), Type.Literal('regular')])),
        importantSeason: Type.Optional(
          Type.Union([
            Type.Literal('winter'),
            Type.Literal('summer'),
            Type.Literal('spring'),
            Type.Literal('fall')
          ])
        ),
        seasonPreferenceDetail: Type.Optional(
          Type.Union([
            Type.Literal('mildWinter'),
            Type.Literal('coldWinter'),
            Type.Literal('snowyWinter'),
            Type.Literal('mildSummer'),
            Type.Literal('hotSummer'),
            Type.Literal('drySummer'),
            Type.Literal('warmSpring'),
            Type.Literal('coolSpring'),
            Type.Literal('drySpring'),
            Type.Literal('warmFall'),
            Type.Literal('coolFall'),
            Type.Literal('dryFall')
          ])
        )
      },
      { additionalProperties: false }
    )
  ],
  { additionalProperties: false }
)

export type WeatherQuery = Static<typeof weatherQuerySchema>
export const weatherQueryValidator = getValidator(weatherQuerySchema, queryValidator)
export const weatherQueryResolver = resolve<WeatherQuery, HookContext>({})

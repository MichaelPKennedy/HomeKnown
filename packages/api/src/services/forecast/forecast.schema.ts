// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const forecastSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Forecast', additionalProperties: false }
)
export type Forecast = Static<typeof forecastSchema>
export const forecastValidator = getValidator(forecastSchema, dataValidator)
export const forecastResolver = resolve<Forecast, HookContext>({})

export const forecastExternalResolver = resolve<Forecast, HookContext>({})

// Schema for creating new entries
export const forecastDataSchema = Type.Pick(forecastSchema, ['text'], {
  $id: 'ForecastData'
})
export type ForecastData = Static<typeof forecastDataSchema>
export const forecastDataValidator = getValidator(forecastDataSchema, dataValidator)
export const forecastDataResolver = resolve<Forecast, HookContext>({})

// Schema for updating existing entries
export const forecastPatchSchema = Type.Partial(forecastSchema, {
  $id: 'ForecastPatch'
})
export type ForecastPatch = Static<typeof forecastPatchSchema>
export const forecastPatchValidator = getValidator(forecastPatchSchema, dataValidator)
export const forecastPatchResolver = resolve<Forecast, HookContext>({})

// Schema for allowed query properties
export const forecastQueryProperties = Type.Pick(forecastSchema, ['id', 'text'])
export const forecastQuerySchema = Type.Intersect(
  [
    querySyntax(forecastQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ForecastQuery = Static<typeof forecastQuerySchema>
export const forecastQueryValidator = getValidator(forecastQuerySchema, queryValidator)
export const forecastQueryResolver = resolve<ForecastQuery, HookContext>({})

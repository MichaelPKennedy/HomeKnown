// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const airQualitySchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'AirQuality', additionalProperties: false }
)
export type AirQuality = Static<typeof airQualitySchema>
export const airQualityValidator = getValidator(airQualitySchema, dataValidator)
export const airQualityResolver = resolve<AirQuality, HookContext>({})

export const airQualityExternalResolver = resolve<AirQuality, HookContext>({})

// Schema for creating new entries
export const airQualityDataSchema = Type.Pick(airQualitySchema, ['text'], {
  $id: 'AirQualityData'
})
export type AirQualityData = Static<typeof airQualityDataSchema>
export const airQualityDataValidator = getValidator(airQualityDataSchema, dataValidator)
export const airQualityDataResolver = resolve<AirQuality, HookContext>({})

// Schema for updating existing entries
export const airQualityPatchSchema = Type.Partial(airQualitySchema, {
  $id: 'AirQualityPatch'
})
export type AirQualityPatch = Static<typeof airQualityPatchSchema>
export const airQualityPatchValidator = getValidator(airQualityPatchSchema, dataValidator)
export const airQualityPatchResolver = resolve<AirQuality, HookContext>({})

// Schema for allowed query properties
export const airQualityQueryProperties = Type.Pick(airQualitySchema, ['id', 'text'])
export const airQualityQuerySchema = Type.Intersect(
  [
    querySyntax(airQualityQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AirQualityQuery = Static<typeof airQualityQuerySchema>
export const airQualityQueryValidator = getValidator(airQualityQuerySchema, queryValidator)
export const airQualityQueryResolver = resolve<AirQualityQuery, HookContext>({})

// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const crimeSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Crime', additionalProperties: false }
)
export type Crime = Static<typeof crimeSchema>
export const crimeValidator = getValidator(crimeSchema, dataValidator)
export const crimeResolver = resolve<Crime, HookContext>({})

export const crimeExternalResolver = resolve<Crime, HookContext>({})

// Schema for creating new entries
export const crimeDataSchema = Type.Pick(crimeSchema, ['text'], {
  $id: 'CrimeData'
})
export type CrimeData = Static<typeof crimeDataSchema>
export const crimeDataValidator = getValidator(crimeDataSchema, dataValidator)
export const crimeDataResolver = resolve<Crime, HookContext>({})

// Schema for updating existing entries
export const crimePatchSchema = Type.Partial(crimeSchema, {
  $id: 'CrimePatch'
})
export type CrimePatch = Static<typeof crimePatchSchema>
export const crimePatchValidator = getValidator(crimePatchSchema, dataValidator)
export const crimePatchResolver = resolve<Crime, HookContext>({})

// Schema for allowed query properties
export const crimeQueryProperties = Type.Pick(crimeSchema, ['id', 'text'])
export const crimeQuerySchema = Type.Intersect(
  [
    querySyntax(crimeQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CrimeQuery = Static<typeof crimeQuerySchema>
export const crimeQueryValidator = getValidator(crimeQuerySchema, queryValidator)
export const crimeQueryResolver = resolve<CrimeQuery, HookContext>({})

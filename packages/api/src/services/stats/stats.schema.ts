// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const statsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Stats', additionalProperties: false }
)
export type Stats = Static<typeof statsSchema>
export const statsValidator = getValidator(statsSchema, dataValidator)
export const statsResolver = resolve<Stats, HookContext>({})

export const statsExternalResolver = resolve<Stats, HookContext>({})

// Schema for creating new entries
export const statsDataSchema = Type.Pick(statsSchema, ['text'], {
  $id: 'StatsData'
})
export type StatsData = Static<typeof statsDataSchema>
export const statsDataValidator = getValidator(statsDataSchema, dataValidator)
export const statsDataResolver = resolve<Stats, HookContext>({})

// Schema for updating existing entries
export const statsPatchSchema = Type.Partial(statsSchema, {
  $id: 'StatsPatch'
})
export type StatsPatch = Static<typeof statsPatchSchema>
export const statsPatchValidator = getValidator(statsPatchSchema, dataValidator)
export const statsPatchResolver = resolve<Stats, HookContext>({})

// Schema for allowed query properties
export const statsQueryProperties = Type.Pick(statsSchema, ['id', 'text'])
export const statsQuerySchema = Type.Intersect(
  [
    querySyntax(statsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type StatsQuery = Static<typeof statsQuerySchema>
export const statsQueryValidator = getValidator(statsQuerySchema, queryValidator)
export const statsQueryResolver = resolve<StatsQuery, HookContext>({})

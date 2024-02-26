// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const searchSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Search', additionalProperties: false }
)
export type Search = Static<typeof searchSchema>
export const searchValidator = getValidator(searchSchema, dataValidator)
export const searchResolver = resolve<Search, HookContext>({})

export const searchExternalResolver = resolve<Search, HookContext>({})

// Schema for creating new entries
export const searchDataSchema = Type.Pick(searchSchema, ['text'], {
  $id: 'SearchData'
})
export type SearchData = Static<typeof searchDataSchema>
export const searchDataValidator = getValidator(searchDataSchema, dataValidator)
export const searchDataResolver = resolve<Search, HookContext>({})

// Schema for updating existing entries
export const searchPatchSchema = Type.Partial(searchSchema, {
  $id: 'SearchPatch'
})
export type SearchPatch = Static<typeof searchPatchSchema>
export const searchPatchValidator = getValidator(searchPatchSchema, dataValidator)
export const searchPatchResolver = resolve<Search, HookContext>({})

// Schema for allowed query properties
export const searchQueryProperties = Type.Pick(searchSchema, ['id', 'text'])
export const searchQuerySchema = Type.Intersect(
  [
    querySyntax(searchQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SearchQuery = Static<typeof searchQuerySchema>
export const searchQueryValidator = getValidator(searchQuerySchema, queryValidator)
export const searchQueryResolver = resolve<SearchQuery, HookContext>({})

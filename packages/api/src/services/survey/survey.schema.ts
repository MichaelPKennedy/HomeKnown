// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const surveySchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Survey', additionalProperties: false }
)
export type Survey = Static<typeof surveySchema>
export const surveyValidator = getValidator(surveySchema, dataValidator)
export const surveyResolver = resolve<Survey, HookContext>({})

export const surveyExternalResolver = resolve<Survey, HookContext>({})

// Schema for creating new entries
export const surveyDataSchema = Type.Pick(surveySchema, ['text'], {
  $id: 'SurveyData'
})
export type SurveyData = Static<typeof surveyDataSchema>
export const surveyDataValidator = getValidator(surveyDataSchema, dataValidator)
export const surveyDataResolver = resolve<Survey, HookContext>({})

// Schema for updating existing entries
export const surveyPatchSchema = Type.Partial(surveySchema, {
  $id: 'SurveyPatch'
})
export type SurveyPatch = Static<typeof surveyPatchSchema>
export const surveyPatchValidator = getValidator(surveyPatchSchema, dataValidator)
export const surveyPatchResolver = resolve<Survey, HookContext>({})

// Schema for allowed query properties
export const surveyQueryProperties = Type.Pick(surveySchema, ['id', 'text'])
export const surveyQuerySchema = Type.Intersect(
  [
    querySyntax(surveyQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SurveyQuery = Static<typeof surveyQuerySchema>
export const surveyQueryValidator = getValidator(surveyQuerySchema, queryValidator)
export const surveyQueryResolver = resolve<SurveyQuery, HookContext>({})

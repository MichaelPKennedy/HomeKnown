// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const publicServicesSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'PublicServices', additionalProperties: false }
)
export type PublicServices = Static<typeof publicServicesSchema>
export const publicServicesValidator = getValidator(publicServicesSchema, dataValidator)
export const publicServicesResolver = resolve<PublicServices, HookContext>({})

export const publicServicesExternalResolver = resolve<PublicServices, HookContext>({})

// Schema for creating new entries
export const publicServicesDataSchema = Type.Pick(publicServicesSchema, ['text'], {
  $id: 'PublicServicesData'
})
export type PublicServicesData = Static<typeof publicServicesDataSchema>
export const publicServicesDataValidator = getValidator(publicServicesDataSchema, dataValidator)
export const publicServicesDataResolver = resolve<PublicServices, HookContext>({})

// Schema for updating existing entries
export const publicServicesPatchSchema = Type.Partial(publicServicesSchema, {
  $id: 'PublicServicesPatch'
})
export type PublicServicesPatch = Static<typeof publicServicesPatchSchema>
export const publicServicesPatchValidator = getValidator(publicServicesPatchSchema, dataValidator)
export const publicServicesPatchResolver = resolve<PublicServices, HookContext>({})

// Schema for allowed query properties
export const publicServicesQueryProperties = Type.Pick(publicServicesSchema, ['id', 'text'])
export const publicServicesQuerySchema = Type.Intersect(
  [
    querySyntax(publicServicesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PublicServicesQuery = Static<typeof publicServicesQuerySchema>
export const publicServicesQueryValidator = getValidator(publicServicesQuerySchema, queryValidator)
export const publicServicesQueryResolver = resolve<PublicServicesQuery, HookContext>({})

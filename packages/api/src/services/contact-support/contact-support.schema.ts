import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

export const contactSupportSchema = Type.Object(
  {
    message_id: Type.Optional(Type.Number()),
    issue_type: Type.String(),
    message: Type.String(),
    createdAt: Type.Optional(Type.String()),
    updatedAt: Type.Optional(Type.String()),
    deletedAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    is_read: Type.Boolean(),
    is_resolved: Type.Boolean(),
    user_id: Type.Optional(Type.Union([Type.Number(), Type.Null()]))
  },
  { $id: 'ContactSupport', additionalProperties: false }
)
export type ContactSupport = Static<typeof contactSupportSchema>
export const contactSupportValidator = getValidator(contactSupportSchema, dataValidator)
export const contactSupportResolver = resolve<ContactSupport, HookContext>({})

// Schema for creating new entries, omitting auto-generated and optional fields for creation
export const contactSupportDataSchema = Type.Pick(
  contactSupportSchema,
  ['issue_type', 'message', 'is_read', 'is_resolved', 'user_id'],
  {
    $id: 'ContactSupportData'
  }
)
export type ContactSupportData = Static<typeof contactSupportDataSchema>
export const contactSupportDataValidator = getValidator(contactSupportDataSchema, dataValidator)
export const contactSupportDataResolver = resolve<ContactSupport, HookContext>({})

// Schema for updating existing entries
export const contactSupportPatchSchema = Type.Partial(contactSupportSchema, {
  $id: 'ContactSupportPatch'
})
export type ContactSupportPatch = Static<typeof contactSupportPatchSchema>
export const contactSupportPatchValidator = getValidator(contactSupportPatchSchema, dataValidator)
export const contactSupportPatchResolver = resolve<ContactSupport, HookContext>({})

// Schema for allowed query properties, adjust as necessary
export const contactSupportQueryProperties = Type.Pick(contactSupportSchema, [
  'message_id',
  'issue_type',
  'is_read',
  'is_resolved',
  'user_id'
])
export const contactSupportQuerySchema = Type.Intersect(
  [querySyntax(contactSupportQueryProperties), Type.Object({}, { additionalProperties: false })],
  { $id: 'ContactSupportQuery', additionalProperties: false }
)
export type ContactSupportQuery = Static<typeof contactSupportQuerySchema>
export const contactSupportQueryValidator = getValidator(contactSupportQuerySchema, queryValidator)
export const contactSupportQueryResolver = resolve<ContactSupportQuery, HookContext>({})

// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const notificationsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Notifications', additionalProperties: false }
)
export type Notifications = Static<typeof notificationsSchema>
export const notificationsValidator = getValidator(notificationsSchema, dataValidator)
export const notificationsResolver = resolve<Notifications, HookContext>({})

export const notificationsExternalResolver = resolve<Notifications, HookContext>({})

// Schema for creating new entries
export const notificationsDataSchema = Type.Pick(notificationsSchema, ['text'], {
  $id: 'NotificationsData'
})
export type NotificationsData = Static<typeof notificationsDataSchema>
export const notificationsDataValidator = getValidator(notificationsDataSchema, dataValidator)
export const notificationsDataResolver = resolve<Notifications, HookContext>({})

// Schema for updating existing entries
export const notificationsPatchSchema = Type.Partial(notificationsSchema, {
  $id: 'NotificationsPatch'
})
export type NotificationsPatch = Static<typeof notificationsPatchSchema>
export const notificationsPatchValidator = getValidator(notificationsPatchSchema, dataValidator)
export const notificationsPatchResolver = resolve<Notifications, HookContext>({})

// Schema for allowed query properties
export const notificationsQueryProperties = Type.Pick(notificationsSchema, ['id', 'text'])
export const notificationsQuerySchema = Type.Intersect(
  [
    querySyntax(notificationsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type NotificationsQuery = Static<typeof notificationsQuerySchema>
export const notificationsQueryValidator = getValidator(notificationsQuerySchema, queryValidator)
export const notificationsQueryResolver = resolve<NotificationsQuery, HookContext>({})

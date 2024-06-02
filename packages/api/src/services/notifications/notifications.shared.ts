// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Notifications,
  NotificationsData,
  NotificationsPatch,
  NotificationsQuery,
  NotificationsService
} from './notifications.class'

export type { Notifications, NotificationsData, NotificationsPatch, NotificationsQuery }

export type NotificationsClientService = Pick<NotificationsService, (typeof notificationsMethods)[number]>

export const notificationsPath = 'notifications'

export const notificationsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const notificationsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(notificationsPath, connection.service(notificationsPath), {
    methods: notificationsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [notificationsPath]: NotificationsClientService
  }
}

import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type {
  Notifications,
  NotificationsData,
  NotificationsPatch,
  NotificationsQuery
} from './notifications.schema'

export type { Notifications, NotificationsData, NotificationsPatch, NotificationsQuery }

export interface NotificationsParams extends Params {
  query?: {
    user_id?: number
    type?: string
    promotional?: boolean
    recommendations?: boolean
    newsletter?: boolean
    feedback?: boolean
  }
}

export class NotificationsService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: Params): Promise<any[] | Paginated<any>> {
    const { query } = params

    try {
      const notifications = await this.sequelize.models.UserNotifications.findAll({
        where: query
      })

      return notifications
    } catch (error: any) {
      throw new Error(`Error finding notifications: ${error.message}`)
    }
  }

  async get(id: Id, params: NotificationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: NotificationsData, params?: NotificationsParams): Promise<any> {
    try {
      const notification = await this.sequelize.models.UserNotifications.create(data)
      return notification
    } catch (error: any) {
      throw new Error(`Error creating notification: ${error.message}`)
    }
  }

  async update(id: NullableId, data: any, params?: NotificationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: NotificationsParams): Promise<any> {
    try {
      const [numberOfAffectedRows, affectedRows] = await this.sequelize.models.UserNotifications.update(
        data,
        {
          where: { id },
          returning: true
        }
      )

      if (numberOfAffectedRows === 0) {
        throw new Error('Notification not found')
      }

      return affectedRows[0]
    } catch (error: any) {
      throw new Error(`Error patching notification: ${error.message}`)
    }
  }

  async remove(id: NullableId, params?: NotificationsParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

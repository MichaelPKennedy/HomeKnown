import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { UserService } from '../users.class'

const createNotifications: Hook<Application, UserService> = async (
  context: HookContext<Application, UserService>
): Promise<HookContext<Application, UserService>> => {
  const { user_id } = context.result || {}

  if (user_id) {
    const notificationsService = context.app.service('notifications')

    const notificationsData = [
      {
        user_id,
        type: 'email',
        promotional: true,
        recommendations: true,
        newsletter: true,
        feedback: true
      },
      {
        user_id,
        type: 'internal',
        promotional: true,
        recommendations: true,
        newsletter: true,
        feedback: true
      }
    ]

    try {
      await Promise.all(notificationsData.map((notification) => notificationsService.create(notification)))
    } catch (error) {
      console.error('Error creating notifications for new user:', error)
    }
  }

  return context
}

export default createNotifications

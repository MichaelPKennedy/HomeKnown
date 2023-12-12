import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './users.schema'
export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends Params {
  query?: { login: string; primary_email: string }
}

export class UserService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: UserParams) {
    const { primary_email } = params.query || {}
    const Users = this.sequelize.models.Users
    const user = await Users.findOne({
      where: {
        primary_email: primary_email
      }
    })
    if (user) {
      return { data: [user] }
    } else {
      return { data: [] }
    }
  }

  async get(id: Id, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: UserParams): Promise<any> {
    const { username, password, primary_email, googleId } = data

    if (googleId) {
      const user = await this.sequelize.models.Users.create({
        googleId,
        primary_email
      })
      return user
    } else {
      // password is hashed automatically
      const user = await this.sequelize.models.Users.create({
        username,
        password,
        primary_email
      })

      const { password: _, ...userWithoutPassword } = user.get({ plain: true })
      return userWithoutPassword
    }
  }

  async update(id: NullableId, data: any, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(user_id: NullableId, data: any, params?: Params): Promise<any> {
    if (user_id === null) {
      throw new Error('No ID provided for patch operation')
    }

    try {
      const [affectedRows] = await this.sequelize.models.Users.update(data, {
        where: { user_id }
      })

      const updatedUser = await this.sequelize.models.Users.findOne({
        where: { user_id }
      })

      return updatedUser
    } catch (error) {
      throw error
    }
  }

  async remove(id: NullableId, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './users.schema'
import { Op } from 'sequelize'
const process = require('process')
import bcrypt from 'bcryptjs'

export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends Params {
  query?: { login: string }
}

export class UserService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: UserParams) {
    //use params.query to query the Users table
    const { login } = params.query || {}
    const Users = this.sequelize.models.Users
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: login }, { primary_email: login }]
      }
    })
    if (user) {
      return { data: [user] } // Wrap the user in an array inside the 'data' property
    } else {
      return { data: [] }
    }
  }

  async get(id: Id, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: UserParams): Promise<any> {
    const { username, password, primary_email } = data

    // password is hashed automatically
    const user = await this.sequelize.models.Users.create({
      username,
      password,
      primary_email
    })
    // Return the new user without the password
    const { password: _, ...userWithoutPassword } = user.get({ plain: true })
    return userWithoutPassword
  }

  async update(id: NullableId, data: any, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

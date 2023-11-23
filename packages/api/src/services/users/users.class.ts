import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Users, UsersData, UsersPatch, UsersQuery } from './users.schema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const process = require('process')
const { Op } = require('sequelize')

export type { Users, UsersData, UsersPatch, UsersQuery }

export interface UsersParams extends Params {
  query?: { username: string; password: string; primary_email: string }
}

export class UsersService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: UsersParams): Promise<any[] | Paginated<any>> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: UsersParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: UsersData, params?: UsersParams): Promise<Users> {
    const { username, password, primary_email } = data

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the new user
    const user = await this.sequelize.models.Users.create({
      username,
      password: hashedPassword,
      primary_email
    })

    // Return the new user without the password
    const { password: _, ...userWithoutPassword } = user.get({ plain: true })
    return userWithoutPassword
  }

  // Custom method for login
  async login(data: { login: string; password: string }): Promise<{ accessToken: string }> {
    const { login, password } = data
    const secretKey = process.env.SECRET_KEY || 'default_secret' // Fallback secret key

    // Find the user by username or primary email
    const user = await this.sequelize.models.Users.findOne({
      where: {
        [Op.or]: [{ username: login }, { primary_email: login }]
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Check the password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid password')
    }

    // Create a JWT token
    const accessToken = jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: '1d' })

    return { accessToken }
  }

  async update(id: NullableId, data: any, params?: UsersParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: UsersParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: UsersParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

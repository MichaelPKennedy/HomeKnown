import { LocalStrategy } from '@feathersjs/authentication-local'
import { AuthenticationResult } from '@feathersjs/authentication'
import { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Application } from '@feathersjs/feathers'

interface User {
  id: number
  username: string
  primary_email: string
  password: string
}

class CustomStrategy extends LocalStrategy {
  app: Application
  sequelize: any
  entity: string

  constructor(app: Application, sequelizeClient: any) {
    super()
    this.app = app
    this.sequelize = sequelizeClient
    this.entity = 'users'
  }

  async findEntity(login: string, params: any): Promise<User | null> {
    const userModel = this.sequelize.models.Users

    const user = await userModel.findOne({
      where: {
        [Op.or]: [{ username: login }, { primary_email: login }]
      }
    })

    return user || null
  }

  async comparePassword(entity: User, password: string): Promise<boolean> {
    const hash = entity.password

    if (!hash) {
      return false
    }

    const valid = await bcrypt.compare(password, hash)
    return valid
  }

  async verify(params: any, password: string, entity: User): Promise<User> {
    const isValid = await this.comparePassword(entity, password)

    if (!isValid) {
      throw new Error('Invalid password')
    }

    return entity
  }

  async authenticate(
    data: any,
    params: any
  ): Promise<{ [x: number]: any; authentication: { strategy: string } }> {
    const { login, password } = data

    const entity = await this.findEntity(login, params)

    if (!entity) {
      // Handle the case when the user is not found
      throw new Error('User not found')
    }

    const isValid = await this.verify(params, password, entity)

    return {
      authentication: { strategy: this.name as string },
      [this.entity]: entity
    }
  }
}

export default CustomStrategy

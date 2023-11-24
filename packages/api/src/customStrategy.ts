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

  constructor(app: Application, sequelizeClient: any) {
    super()
    this.app = app
    this.sequelize = sequelizeClient
  }

  async findEntity(login: string, params: any): Promise<User | null> {
    const userModel = this.sequelize.models.Users

    const user = await userModel.findOne({
      where: {
        [Op.or]: [{ username: login }, { primary_email: login }]
      }
    })

    return user
  }

  async verify(params: any, password: string, entity: User): Promise<User> {
    const isValid = await bcrypt.compare(password, entity.password)

    if (!isValid) {
      throw new Error('Invalid password')
    }

    return entity
  }

  async getEntityQuery(query: any, params: any): Promise<any> {
    // Custom query adjustments if needed
    return query
  }

  async getPayload(authResult: AuthenticationResult, params: any): Promise<{ accessToken: string }> {
    const secretKey = process.env.SECRET_KEY || 'default_secret' // Fallback secret key
    const accessToken = jwt.sign({ userId: authResult.user.user_id }, secretKey, { expiresIn: '1d' })
    return { accessToken }
  }
}

export default CustomStrategy

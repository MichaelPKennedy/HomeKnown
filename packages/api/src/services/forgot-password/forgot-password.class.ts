import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type {
  ForgotPassword,
  ForgotPasswordData,
  ForgotPasswordPatch,
  ForgotPasswordQuery
} from './forgot-password.schema'
import type { Application } from '../../declarations'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export type { ForgotPassword, ForgotPasswordData, ForgotPasswordPatch, ForgotPasswordQuery }

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

export interface ForgotPasswordParams extends Params {
  query?: {
    email: string
  }
}

export class ForgotPasswordService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: ForgotPasswordParams): Promise<any> {
    const { email } = params.query || {}
    if (!email) {
      throw new Error('Email address is required.')
    }

    const user = await this.sequelize.models.Users.findOne({
      where: { primary_email: email }
    })

    if (!user) {
      return {
        message: 'If an account exists for this email, a reset email has been sent.',
        email: null,
        token: null
      }
    }

    const token = crypto.randomBytes(20).toString('hex')
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 1)

    await this.sequelize.models.Users.update(
      {
        forgotPswdToken: token,
        forgotPswdExpiry: expiry
      },
      {
        where: { primary_email: email }
      }
    )

    return {
      message: 'If an account exists for this email, a reset email has been sent.',
      email: user.primary_email,
      token: token
    }
  }

  async get(token: Id, params?: ForgotPasswordParams): Promise<any> {
    if (!token) {
      throw new Error('Verification token is required.')
    }

    const user = await this.sequelize.models.Users.findOne({
      where: { forgotPswdToken: token }
    })

    if (!user) {
      return { verified: false, message: 'Invalid or expired verification token.' }
    }

    const now = new Date()
    const tokenExpiryDate = new Date(user.forgotPswdExpiry)
    if (now > tokenExpiryDate) {
      return { verified: false, message: 'Verification token has expired.' }
    }

    return { verified: true, message: 'Forgot password token verified successfully.' }
  }

  async create(data: any, params: ForgotPasswordParams): Promise<any> {
    const { token, newPassword } = data

    if (!token || !newPassword) {
      throw new Error('Token and new password are required.')
    }

    let t
    try {
      t = await this.sequelize.transaction()

      const user = await this.sequelize.models.Users.findOne({
        where: { forgotPswdToken: token },
        transaction: t
      })

      if (!user) {
        throw new Error('Token is invalid')
      }

      const now = new Date()
      const tokenExpiryDate = new Date(user.forgotPswdExpiry)
      if (now > tokenExpiryDate) {
        throw new Error('Token is expired')
      }

      const previousPasswords = await this.sequelize.models.PasswordHistory.findAll(
        {
          where: { user_id: user.user_id },
          order: [['createdAt', 'DESC']],
          limit: 4
        },
        { transaction: t }
      )

      for (let record of previousPasswords) {
        if (await bcrypt.compare(newPassword, record.passwordHash)) {
          throw new Error('New password cannot match any of the last four passwords.')
        }
      }

      const newHash = await bcrypt.hash(newPassword, 10)

      if (user.password) {
        await this.sequelize.models.PasswordHistory.create(
          {
            user_id: user.user_id,
            passwordHash: user.password
          },
          { transaction: t }
        )
      }

      await this.sequelize.models.Users.update(
        { password: newHash, forgotPswdExpiry: null, forgotPswdToken: null },
        {
          where: { user_id: user.user_id },
          transaction: t
        }
      )

      await t.commit()
      return { success: true, message: 'Password updated successfully.' }
    } catch (error) {
      if (t) {
        await t.rollback()
      }
      throw error
    }
  }

  async update(id: NullableId, data: any, params?: ForgotPasswordParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: ForgotPasswordParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: ForgotPasswordParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

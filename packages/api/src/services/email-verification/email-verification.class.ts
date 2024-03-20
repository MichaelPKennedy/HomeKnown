import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type {
  EmailVerification,
  EmailVerificationData,
  EmailVerificationPatch,
  EmailVerificationQuery
} from './email-verification.schema'
import type { Application } from '../../declarations'

export type { EmailVerification, EmailVerificationData, EmailVerificationPatch, EmailVerificationQuery }

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

export interface EmailVerificationParams extends Params {
  query?: {}
}

export class EmailVerificationService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: EmailVerificationParams): Promise<any[] | Paginated<any>> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: EmailVerificationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: EmailVerificationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: EmailVerificationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: EmailVerificationParams): Promise<any> {
    const { token } = data
    if (!token) {
      throw new Error('Verification token is required.')
    }

    const user = await this.sequelize.models.Users.findOne({
      where: { verificationToken: token }
    })

    if (!user) {
      throw new Error('Invalid or expired verification token.')
    }

    await user.update({ emailVerified: true, verificationToken: null })

    return { status: 'success', message: 'Email verified successfully.' }
  }
  async remove(id: NullableId, params?: EmailVerificationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

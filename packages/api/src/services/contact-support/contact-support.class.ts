import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type {
  ContactSupport,
  ContactSupportData,
  ContactSupportPatch,
  ContactSupportQuery
} from './contact-support.schema'
import type { Application } from '../../declarations'

export type { ContactSupport, ContactSupportData, ContactSupportPatch, ContactSupportQuery }

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

export interface ContactSupportParams extends Params {
  query?: {}
}

export class ContactSupportService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: ContactSupportParams): Promise<any[] | Paginated<any>> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: ContactSupportParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: ContactSupportData, params?: ContactSupportParams): Promise<any> {
    const contactSupportModel = this.sequelize.model('ContactSupport')
    try {
      const createdEntry = await contactSupportModel.create(data)
      return createdEntry.get({ plain: true })
    } catch (error) {
      console.error('Error creating contact support entry:', error)
      throw new Error('Failed to submit message. Please try again')
    }
  }

  async update(id: NullableId, data: any, params?: ContactSupportParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: ContactSupportParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
  async remove(id: NullableId, params?: ContactSupportParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

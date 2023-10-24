import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type {
  PublicServices,
  PublicServicesData,
  PublicServicesPatch,
  PublicServicesQuery
} from './public-services.schema'
import { Op } from 'sequelize'

export type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery }

export interface PublicServicesParams extends Params {
  query?: {
    selectedJobs: { occ_title: string; occ_code: string }[]
    minSalary: number
    jobLevel: 'entry-level' | 'senior' | 'both'
  }
}

export class PublicServicesService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: PublicServicesParams): Promise<any[] | Paginated<any>> {
    //TODO: Implenent find method
    return []
  }

  async get(id: Id, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

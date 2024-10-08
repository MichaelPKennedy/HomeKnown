import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Occupation, OccupationData, OccupationPatch, OccupationQuery } from './occupation.schema'
import { Op } from 'sequelize'

export type { Occupation, OccupationData, OccupationPatch, OccupationQuery }

interface QueryParams {
  query: string
}

export interface OccupationParams extends Params {
  query?: QueryParams
}

export class OccupationService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: OccupationParams): Promise<any[] | Paginated<any>> {
    if (!params.query || !params.query.query) {
      throw new Error('Query parameter is missing.')
    }

    const inputQuery = params.query.query

    const matchingOccupations = await this.sequelize.models.Occupation.findAll({
      where: {
        occ_title: {
          [Op.like]: `%${inputQuery}%`
        }
      },
      limit: 10
    })

    return matchingOccupations
  }

  async get(id: Id, params?: OccupationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: OccupationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: OccupationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: OccupationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: OccupationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

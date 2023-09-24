import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import axios from 'axios'
import type { Application } from '../../declarations'
import { Op } from 'sequelize'
import { Occupation } from '../../models/occupation.model'

interface QueryParams {
  query: string
}

export interface OccupationParams extends Params {
  query?: QueryParams
}

export class OccupationService implements ServiceMethods<any> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async find(params: OccupationParams): Promise<any[] | Paginated<any>> {
    if (!params.query || !params.query.query) {
      throw new Error('Query parameter is missing.')
    }

    const inputQuery = params.query.query
    const matchingOccupations = await Occupation.findAll({
      where: {
        occ_title: {
          [Op.iLike]: `%${inputQuery}%`
        }
      },
      limit: 10 // Limit to a reasonable number for suggestions
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

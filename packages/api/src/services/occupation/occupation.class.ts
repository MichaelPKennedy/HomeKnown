import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import { Op } from 'sequelize'

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

    // Assuming Occupation is already a Sequelize model. Use this.sequelize.models.Occupation if it's not directly accessible.
    const matchingOccupations = await this.sequelize.models.Occupation.findAll({
      where: {
        occ_title: {
          [Op.like]: `%${inputQuery}%`
        }
      },
      limit: 10
    })
    console.log('matchingOccupations', matchingOccupations)
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

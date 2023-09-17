import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Industry, IndustryData, IndustryPatch, IndustryQuery } from './industry.schema'

export type { Industry, IndustryData, IndustryPatch, IndustryQuery }

import { StateIndustrySalary } from '../../models/state-industry-salary.model'

export interface SurveyFormData {
  desiredSalary?: number;
  selectedJobs?: { naics: string; occ: string }[];
}

interface QueryParams {
  query: string
}
export interface IndustryParams extends Params {
  query?: QueryParams
}

export class IndustryService implements ServiceMethods<any> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async find(params: IndustryParams): Promise<any[] | Paginated<any>> {
    const { query } = params
    const { desiredSalary, selectedJobs } = query

    let whereClause = {}

    if (selectedJobs && selectedJobs.length) {
      whereClause.naics_code = selectedJobs.map((job) => job.naics)
      whereClause.occ_code = selectedJobs.map((job) => job.occ)
    }

    // Define the ordering condition to get the "closest" average salary
    let orderCondition = this?.app?
      .get('sequelize')
      .fn('ABS', this.app.get('sequelize').col('average_salary') - desiredSalary)

    // Query the database using sequelize
    const results = await StateIndustrySalary.findAll({
      where: whereClause,
      order: [[orderCondition, 'ASC']],
      limit: 10
    })

    // Return the results
    return results
  }

  async get(id: Id, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: IndustryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Industry, IndustryData, IndustryPatch, IndustryQuery } from './industry.schema'
import { Op } from 'sequelize'
import { State } from '../../../models/state.model'

export type { Industry, IndustryData, IndustryPatch, IndustryQuery }

export interface IndustryParams extends Params {
  selectedJobs: { occ_title: string; occ_code: string }[]
  desiredSalary: number
  minSalary: number
  jobLevel: 'entry-level' | 'senior' | 'both'
  wagePriority: number
}

export class IndustryService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  private async getNationalAverageForOccupation(occ_code: string): Promise<number> {
    const StateIndustrySalary = this.sequelize.models.StateIndustrySalary

    const nationalAverage = await StateIndustrySalary.findOne({
      where: { occ_code: occ_code },
      attributes: [[this.sequelize.fn('AVG', this.sequelize.col('average_hourly')), 'national_avg_hourly']]
    })

    return parseFloat(nationalAverage.getDataValue('national_avg_hourly'))
  }

  async find(params: IndustryParams): Promise<any[] | Paginated<any>> {
    console.log('params', params)
    const { selectedJobs, desiredSalary, minSalary, jobLevel, wagePriority } = params

    if (!selectedJobs || selectedJobs.length === 0) {
      throw new Error('No selected jobs provided.')
    }

    const occ_codes = selectedJobs.map((job: any) => job.occ_code)

    // Starting with basic filters
    let whereClause: any = {
      occ_code: { [Op.in]: occ_codes },
      average_salary: {
        [Op.between]: [minSalary, desiredSalary]
      }
    }

    // Adjusting for job level
    if (jobLevel === 'entry-level') {
      whereClause['average_salary'] = {
        [Op.lte]: this.sequelize.col('h_median')
      }
    } else if (jobLevel === 'senior') {
      whereClause['average_salary'] = {
        [Op.gt]: this.sequelize.col('h_median')
      }
    }

    const nationalAvgHourly = await this.getNationalAverageForOccupation(occ_codes[0])

    const StateIndustrySalary = this.sequelize.models.StateIndustrySalary
    const results = await StateIndustrySalary.findAll({
      where: whereClause,
      attributes: [
        'state_code',
        [this.sequelize.fn('AVG', this.sequelize.col('StateIndustrySalary.average_salary')), 'avg_salary'],
        [this.sequelize.fn('AVG', this.sequelize.col('StateIndustrySalary.average_hourly')), 'avg_hourly']
      ],
      include: [
        {
          model: State,
          attributes: ['state']
        }
      ],
      group: ['state_code'],
      order: [
        [this.sequelize.fn('ABS', this.sequelize.literal(`avg_hourly - ${nationalAvgHourly}`)), 'DESC']
      ],
      limit: 10
    })

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

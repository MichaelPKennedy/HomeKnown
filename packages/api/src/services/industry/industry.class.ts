import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Industry, IndustryData, IndustryPatch, IndustryQuery } from './industry.schema'
import { Op } from 'sequelize'
import { State } from '../../../models/state.model'

export type { Industry, IndustryData, IndustryPatch, IndustryQuery }

export interface IndustryParams extends Params {
  selectedJobs: { occ_title: string; occ_code: string }[]
  minSalary: number
  jobLevel: 'entry-level' | 'senior' | 'both'
}

export class IndustryService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  private async getNationalAverageForOccupation(
    occ_code: string
  ): Promise<{ nationalAvgSalary: number; nationalAvgHourly: number }> {
    const StateIndustrySalary = this.sequelize.models.StateIndustrySalary

    const salary = await StateIndustrySalary.findOne({
      where: { occ_code: occ_code },
      attributes: [[this.sequelize.fn('AVG', this.sequelize.col('average_salary')), 'national_avg_salary']]
    })

    const hourly = await StateIndustrySalary.findOne({
      where: { occ_code: occ_code },
      attributes: [[this.sequelize.fn('AVG', this.sequelize.col('average_hourly')), 'national_avg_hourly']]
    })

    return {
      salary: parseFloat(salary.getDataValue('national_avg_salary')),
      hourly: parseFloat(hourly.getDataValue('national_avg_hourly'))
    } as any
  }

  async find(params: IndustryParams): Promise<any[] | Paginated<any>> {
    const { selectedJobs, minSalary, jobLevel } = params

    if (!selectedJobs || selectedJobs.length === 0) {
      throw new Error('No selected jobs provided.')
    }

    const occ_codes = selectedJobs.map((job: any) => job.occ_code)
    const nationalAverage = await this.getNationalAverageForOccupation(occ_codes[0])

    let whereClause: any = {
      occ_code: { [Op.in]: occ_codes },
      average_salary: {
        [Op.gte]: minSalary
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
      order: [[this.sequelize.col('avg_salary'), 'DESC']],
      limit: 10
    })

    const topStateCodes = results.map((record: any) => record.getDataValue('state_code'))

    //get top cities
    const CityIndustrySalary = this.sequelize.models.CityIndustrySalary
    const Area = this.sequelize.models.Area

    const topCities = await CityIndustrySalary.findAll({
      where: {
        ...whereClause
      },
      attributes: [
        'area_code',
        [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_salary')), 'avg_salary'],
        [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_hourly')), 'avg_hourly']
      ],
      include: [
        {
          model: Area,
          attributes: ['area_title'],
          where: {
            state_code: {
              [Op.in]: topStateCodes
            }
          },
          include: [
            {
              model: State,
              attributes: ['state']
            }
          ]
        }
      ],
      group: ['area_code'],
      order: [[this.sequelize.col('avg_salary'), 'DESC']],
      limit: 10
    })

    return {
      jobs: selectedJobs.map((job: any) => job.occ_title),
      nationalAverage,
      topStates: results,
      topCities: topCities
    } as any
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

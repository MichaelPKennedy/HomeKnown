import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Cost, CostData, CostPatch, CostQuery } from './cost.schema'
import { Sequelize, Op } from 'sequelize'
import c from 'config'

export type { Cost, CostData, CostPatch, CostQuery }

export class CostService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: any): Promise<any[] | Paginated<any>> {
    throw new Error('Method not implemented.')
  }

  async get(state_code: number): Promise<any> {
    try {
      const state = await this.sequelize.models.State.findOne({
        where: { state_code },
        attributes: [
          'state',
          'state_code',
          'totalCostIndex',
          'GroceryCostsIndex',
          'HealthCostsIndex',
          'HousingCostsIndex',
          'MiscCostsIndex',
          'TranspCostsIndex',
          'UtilCostsIndex'
        ]
      })

      if (!state) {
        throw new Error('State not found')
      }

      const nationalAverages = await this.getNationalAverages()

      return {
        state,
        nationalAverages
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getNationalAverages(): Promise<any> {
    try {
      const nationalAverages = await this.sequelize.models.State.findAll({
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('totalCostIndex')), 'avgTotalCostIndex'],
          [Sequelize.fn('AVG', Sequelize.col('GroceryCostsIndex')), 'avgGroceryCostsIndex'],
          [Sequelize.fn('AVG', Sequelize.col('HealthCostsIndex')), 'avgHealthCostsIndex'],
          [Sequelize.fn('AVG', Sequelize.col('HousingCostsIndex')), 'avgHousingCostsIndex'],
          [Sequelize.fn('AVG', Sequelize.col('MiscCostsIndex')), 'avgMiscCostsIndex'],
          [Sequelize.fn('AVG', Sequelize.col('TranspCostsIndex')), 'avgTranspCostsIndex'],
          [Sequelize.fn('AVG', Sequelize.col('UtilCostsIndex')), 'avgUtilCostsIndex']
        ],
        where: {
          totalCostIndex: { [Op.ne]: null },
          GroceryCostsIndex: { [Op.ne]: null },
          HealthCostsIndex: { [Op.ne]: null },
          HousingCostsIndex: { [Op.ne]: null },
          MiscCostsIndex: { [Op.ne]: null },
          TranspCostsIndex: { [Op.ne]: null },
          UtilCostsIndex: { [Op.ne]: null }
        },
        raw: true
      })

      return nationalAverages[0]
    } catch (error) {
      console.error(error)
    }
  }

  async create(data: any, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

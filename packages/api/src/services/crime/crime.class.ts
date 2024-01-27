import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Crime, CrimeData, CrimePatch, CrimeQuery } from './crime.schema'
import { Op } from 'sequelize'

export type { Crime, CrimeData, CrimePatch, CrimeQuery }

export interface CrimeParams extends Params {}

export class CrimeService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: CrimeParams): Promise<any[] | Paginated<any>> {
    try {
      const crimeRates = await this.sequelize.models.CrimeStatsCity.findAll({
        attributes: ['crime_score', 'city', 'state', 'city_id'],
        where: {
          [Op.and]: [{ crime_score: { [Op.ne]: null } }, { city_id: { [Op.ne]: null } }]
        },
        include: [
          {
            model: this.sequelize.models.City,
            attributes: ['county_fips']
          }
        ],
        order: [['crime_score', 'ASC']],
        limit: 300
      })

      let ranking = 1 // Start ranking at 1
      let previousCrimeScore = crimeRates[0]?.dataValues?.crime_score

      const rankedCrimeRates = crimeRates.map((crimeRate: any) => {
        if (crimeRate.dataValues.crime_score !== previousCrimeScore) {
          ranking++
          previousCrimeScore = crimeRate.dataValues.crime_score
        }

        return {
          ranking,
          city: crimeRate.dataValues.city,
          city_id: crimeRate.dataValues.city_id,
          county: crimeRate.dataValues.City.county_fips,
          state: crimeRate.dataValues.state,
          crime_score: crimeRate.dataValues.crime_score
        }
      })

      return rankedCrimeRates
    } catch (error) {
      console.error('Error fetching crime rates:', error)
      throw new Error('Error fetching crime rates')
    }
  }

  async get(id: Id, params?: CrimeParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: CrimeParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: CrimeParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: CrimeParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: CrimeParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

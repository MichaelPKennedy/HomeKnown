import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Crime, CrimeData, CrimePatch, CrimeQuery } from './crime.schema'
import { Op } from 'sequelize'

export type { Crime, CrimeData, CrimePatch, CrimeQuery }

export interface CrimeParams extends Params {
  query?: { minPopulation: number; maxPopulation: number; includedStates: number[] }
}

type CityWhereCondition = {
  pop_2022?: {}
  state_code?: {
    [key: string]: number[]
  }
}

export class CrimeService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: CrimeParams): Promise<any[] | Paginated<any>> {
    if (!params.query) {
      throw new Error('Query parameters are missing!')
    }
    const { minPopulation, maxPopulation, includedStates } = params.query

    let cityWhereCondition: CityWhereCondition = {}

    if (minPopulation >= 0 && maxPopulation >= 0) {
      cityWhereCondition.pop_2022 = {
        [Op.gte]: minPopulation,
        [Op.lte]: maxPopulation
      }
    } else if (minPopulation >= 0) {
      cityWhereCondition.pop_2022 = { [Op.gte]: minPopulation }
    } else if (maxPopulation >= 0) {
      cityWhereCondition.pop_2022 = { [Op.lte]: maxPopulation }
    }

    if (includedStates?.length > 0) {
      cityWhereCondition.state_code = {
        [Op.in]: includedStates
      }
    }

    try {
      const crimeRates = await this.sequelize.models.CrimeStatsCity.findAll({
        attributes: ['crime_score', 'city', 'state', 'city_id'],
        where: {
          [Op.and]: [{ crime_score: { [Op.ne]: null } }, { city_id: { [Op.ne]: null } }]
        },
        include: [
          {
            model: this.sequelize.models.City,
            attributes: ['county_fips'],
            where: cityWhereCondition
          }
        ],
        order: [['crime_score', 'ASC']],
        limit: 5000
      })

      let ranking = 1
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

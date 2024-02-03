import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Housing, HousingData, HousingPatch, HousingQuery } from './housing.schema'
import { Op } from 'sequelize'

interface StateAttributes {
  state_code: number
  state: string
  state_abbrev: string
  totalCostIndex: number
  GroceryCostsIndex: number
  HealthCostsIndex: number
  HousingCostsIndex: number
  MiscCostsIndex: number
  TranspCostsIndex: number
  UtilCostsIndex: number
}

export type { Housing, HousingData, HousingPatch, HousingQuery }

export interface HousingParams extends Params {
  query?: {
    housingType: 'rent' | 'buy'
    homeMin: number
    homeMax: number
    rentMin: number
    rentMax: number
    minPopulation: number
    maxPopulation: number
    includedStates: number[]
  }
}

type CityWhereCondition = {
  [key: string]: {
    [Op.gte]: number
    [Op.lte]: number
  }
} & {
  pop_2022?: {}
  state_code?: {
    [key: string]: number[]
  }
}

export class HousingService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: HousingParams): Promise<any[] | Paginated<any>> {
    const City = this.sequelize.models.City
    const State = this.sequelize.models.State
    const Area = this.sequelize.models.Area
    const states = await State.findAll({
      attributes: ['state_code', 'totalCostIndex']
    })

    const totalCostIndices = states.reduce((acc: { [key: number]: number }, state: StateAttributes) => {
      acc[state.state_code] = state.totalCostIndex
      return acc
    }, {})

    if (!params.query) {
      throw new Error('Query parameters are missing!')
    }
    const { homeMin, homeMax, rentMin, rentMax, housingType, minPopulation, maxPopulation, includedStates } =
      params.query
    const priceType = housingType === 'rent' ? 'currentRentPrice' : 'currentHomePrice'
    const min = housingType === 'rent' ? rentMin : homeMin
    const max = housingType === 'rent' ? rentMax : homeMax

    let cityWhereCondition: CityWhereCondition = {
      [priceType]: {
        [Op.gte]: min,
        [Op.lte]: max
      }
    }

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

    const cities = await City.findAll({
      where: cityWhereCondition,
      attributes: ['city_id', 'area_code', 'county_fips', priceType],
      include: [
        {
          model: Area,
          attributes: ['state_code']
        }
      ]
    })

    const rankedCities = cities
      .map((city: any) => {
        const totalCostIndex = Number(totalCostIndices[city.dataValues.Area.dataValues.state_code])
        const adjustedCostIndex = totalCostIndex * (min / 100) || 0
        const homePrice = Number(city.dataValues[priceType])
        return {
          city_id: city.dataValues.city_id,
          county: city.dataValues.county_fips,
          price: homePrice,
          priceType,
          rank: Math.round((homePrice + adjustedCostIndex) * 100) / 100,
          costIndex: totalCostIndex
        }
      })
      .sort((a: any, b: any) => a.rank - b.rank)
      .slice(0, 300)

    let ranking = 1
    let previousRank = rankedCities[0]?.rank

    const finalRankedCities = rankedCities.map((city: any) => {
      if (city.rank !== previousRank) {
        ranking++
        previousRank = city.rank
      }
      return {
        ...city,
        ranking
      }
    })

    if (finalRankedCities.length < 10) {
      console.log('obtained less than 10 cities from housing')
    }

    return finalRankedCities
  }

  async get(id: Id, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: HousingParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

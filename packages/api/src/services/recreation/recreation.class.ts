import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Recreation, RecreationData, RecreationPatch, RecreationQuery } from './recreation.schema'
import { Op } from 'sequelize'
import { RecreationalInterestMappings } from './constants'

export type { Recreation, RecreationData, RecreationPatch, RecreationQuery }

type RecreationalInterestKey =
  | 'mountains'
  | 'nationalParks'
  | 'forests'
  | 'waterfrontViews'
  | 'scenicDrives'
  | 'historicSites'
  | 'monuments'
  | 'museums'
  | 'naturalWonders'
  | 'rockClimbing'
  | 'waterSports'
  | 'beach'
  | 'diverseFloraFauna'
  | 'birdWatching'
  | 'zoos'
  | 'winterSports'
  | 'stargazing'
  | 'amusementParks'

type RecreationalInterestMappings = {
  [key in RecreationalInterestKey]: string[]
}

export interface RecreationParams extends Params {
  query: RecreationQuery
}

type CityWhereCondition = {
  pop_2022?: {}
  state_code?: {
    [key: string]: number[]
  }
}

export class RecreationService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: any): Promise<any> {
    const { recreationalInterests, minPopulation, maxPopulation, includedStates } = params.query
    const interests = Array.isArray(recreationalInterests) ? recreationalInterests : [recreationalInterests]

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

    const initialRankings = await this.sequelize.models.CityPlacesCache.findAll({
      where: {
        place_type: { [Op.in]: interests }
      },
      attributes: [
        'city_id',
        [this.sequelize.fn('SUM', this.sequelize.col('place_count')), 'totalPlaceCount']
      ],
      include: [
        {
          model: this.sequelize.models.City,
          attributes: ['city_name', 'county_fips'],
          where: cityWhereCondition
        }
      ],
      group: ['city_id'],
      order: [[this.sequelize.literal('totalPlaceCount'), 'DESC']],
      limit: 10000
    })

    const cityDataMap = initialRankings.reduce((acc: any, item: any) => {
      const cityID = item.getDataValue('city_id')
      acc[cityID] = {
        city_name: item.City.city_name,
        county_fips: item.City.county_fips
      }
      return acc
    }, {})

    const cityIds = initialRankings.map((ranking: any) => ranking.getDataValue('city_id'))

    const detailedCounts = await this.sequelize.models.CityPlacesCache.findAll({
      where: {
        city_id: { [Op.in]: cityIds },
        place_type: { [Op.in]: interests }
      },
      attributes: ['city_id', 'place_type', 'place_count']
    })

    const countsMap = detailedCounts.reduce((acc: any, item: any) => {
      const { city_id, place_type, place_count } = item.get({ plain: true })
      acc[city_id] = acc[city_id] || { totalPlaceCount: 0, diversityScore: 0, placeTypes: new Set() }
      acc[city_id].totalPlaceCount += place_count
      if (place_count > 0) {
        acc[city_id].placeTypes.add(place_type)
        acc[city_id].diversityScore = acc[city_id].placeTypes.size
      }
      return acc
    }, {})

    let rankings = Object.keys(countsMap).map((city_id) => ({
      city_id,
      ...countsMap[city_id],
      diversityScore: countsMap[city_id].diversityScore,
      totalPlaceCount: countsMap[city_id].totalPlaceCount,
      city_name: cityDataMap[city_id].city_name,
      county_fips: cityDataMap[city_id].county_fips
    }))

    rankings.sort((a, b) => b.diversityScore - a.diversityScore || b.totalPlaceCount - a.totalPlaceCount)

    let currentRank = 1
    rankings.forEach((city, index, array) => {
      if (index > 0) {
        if (
          city.diversityScore === array[index - 1].diversityScore &&
          city.totalPlaceCount === array[index - 1].totalPlaceCount
        ) {
          city.ranking = array[index - 1].ranking
        } else {
          city.ranking = currentRank
        }
      } else {
        city.ranking = currentRank
      }
      if (index < array.length - 1) {
        if (
          city.diversityScore !== array[index + 1].diversityScore ||
          city.totalPlaceCount !== array[index + 1].totalPlaceCount
        ) {
          currentRank = index + 2
        }
      }
    })

    // Prepare the final output
    const finalOutput = rankings.slice(0, 10000).map((city) => ({
      city_id: city.city_id,
      city_name: city.city_name,
      county: city.county_fips,
      ranking: city.ranking
    }))

    return finalOutput
  }

  async get(id: Id, params?: RecreationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: RecreationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: RecreationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: RecreationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: RecreationParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

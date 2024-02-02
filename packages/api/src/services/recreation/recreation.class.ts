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

function haversineDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in kilometers
  return d * 0.621371 // Convert to miles
}

export interface RecreationParams extends Params {
  query: RecreationQuery
}

export class RecreationService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: any): Promise<any> {
    const { recreationalInterests } = params.query
    const interests = Array.isArray(recreationalInterests) ? recreationalInterests : [recreationalInterests]

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
          attributes: ['city_name', 'county_fips']
        }
      ],
      group: ['city_id'],
      order: [[this.sequelize.literal('totalPlaceCount'), 'DESC']],
      limit: 1000
    })

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
      totalPlaceCount: countsMap[city_id].totalPlaceCount
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
    const finalOutput = rankings.slice(0, 300).map((city) => ({
      city_id: city.city_id,
      city_name: city.City.city_name,
      county: city.City.county_fips,
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

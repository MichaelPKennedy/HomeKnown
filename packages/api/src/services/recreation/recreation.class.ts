import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Recreation, RecreationData, RecreationPatch, RecreationQuery } from './recreation.schema'
import { point, distance } from '@turf/turf'

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

const RecreationalInterestMappings = {
  mountains: ['Mountain Peak', 'Mountain', 'Hiking Trail', 'Hiking Spot'],
  nationalParks: [
    'National Park',
    'State Park',
    'Park',
    'National Park for the Performing Arts',
    'National Preserve',
    'Scenic Area',
    'National Grassland',
    'National Reserve',
    'Wilderness Area',
    'National Recreation Area'
  ],
  forests: ['National Forest', 'Rainforest'],
  waterfrontViews: [
    'National Seashore',
    'Beach',
    'National Lakeshore',
    'Lake',
    'Great Lake',
    'Lakes',
    'Reservoir',
    'Bay',
    'Inlet',
    'River',
    'Fjord',
    'Lake System',
    'Lake Region',
    'National River'
  ],
  scenicDrives: ['Scenic Drive', 'Parkway'],
  historicSites: [
    'Historic Site',
    'Historical Park',
    'Historical Site',
    'Ranch',
    'Historic Landmark',
    'Historic Trail',
    'Landmark',
    'Center',
    'Battlefields Memorial',
    'Heritage Area',
    'Memorial Park',
    'Heritage Corridor',
    'National Military Park',
    'National Battlefield',
    'National Historical Park'
  ],
  monuments: ['National Monument', 'National Memorial', 'Mountain Memorial', 'Memorial', 'Monument'],
  museums: ['Museum', 'National Museum'],
  naturalWonders: [
    'Natural Arch',
    'Waterfall',
    'Viewpoint',
    'Granite Dome',
    'Slot Canyon',
    'Valley',
    'Estuary',
    'Cave'
  ],
  rockClimbing: ['Climbing Area'],
  waterSports: [
    'National Riverway',
    'National Scenic River',
    'Scenic River',
    'National Lakeshore',
    'Lake',
    'Great Lake',
    'Lakes',
    'Bay',
    'Lake System',
    'Lake Region',
    'National River'
  ],
  beach: ['Beach'],
  diverseFloraFauna: ['Botanical Garden'],
  birdWatching: [],
  zoos: ['Zoo', 'Wildlife Reserve'],
  winterSports: ['Ski Resort'],
  stargazing: ['Observatory'],
  amusementParks: ['Amusement Park']
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

  async find(params: RecreationParams): Promise<any[] | Paginated<any>> {
    const { recreationalInterests } = params.query

    const landmarkTypes = (
      Array.isArray(recreationalInterests) ? recreationalInterests : [recreationalInterests]
    ).flatMap((interest: any) => RecreationalInterestMappings[interest as RecreationalInterestKey])

    const landmarks = await this.sequelize.models.LandMarks.findAll({
      where: { Type: landmarkTypes }
    })

    const cities = await this.sequelize.models.City.findAll({
      include: [
        {
          model: this.sequelize.models.Area,
          required: true,
          attributes: ['area_code'],
          include: [
            {
              model: this.sequelize.models.State,
              required: true,
              attributes: ['state']
            }
          ]
        }
      ]
    })

    const cityRankings: {
      city: any
      closestDistance: number
      landmarkCount: number
      nearbyLandmarks: any[]
    }[] = []

    cities.forEach((city: any) => {
      let closestDistance = Infinity
      let landmarkCount = 0
      const nearbyLandmarks: any[] = []

      landmarks.forEach((landmark: any) => {
        const from = point([city.Latitude, city.Longitude])
        const to = point([landmark.Latitude, landmark.Longitude])
        const currentDistance = haversineDistance(
          city.Latitude,
          city.Longitude,
          landmark.Latitude,
          landmark.Longitude
        )

        if (currentDistance < closestDistance) {
          closestDistance = currentDistance
        }

        if (currentDistance <= 50) {
          landmarkCount++
          nearbyLandmarks.push(landmark)
        }
      })

      if (landmarkCount > 0) {
        cityRankings.push({ city, closestDistance, landmarkCount, nearbyLandmarks })
      }
    })

    // Sort cities by number of landmarks and then by proximity, and limit to top 10
    const topCities = cityRankings
      .sort((a, b) => b.landmarkCount - a.landmarkCount || a.closestDistance - b.closestDistance)
      .slice(0, 10)
      .map((entry) => ({
        city_id: entry.city.city_id,
        city: entry.city,
        nearbyLandmarks: entry.nearbyLandmarks
      }))

    return topCities
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

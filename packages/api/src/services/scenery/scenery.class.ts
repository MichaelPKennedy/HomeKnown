import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Scenery, SceneryData, SceneryPatch, SceneryQuery } from './scenery.schema'

export type { Scenery, SceneryData, SceneryPatch, SceneryQuery }

export interface SceneryParams extends Params {
  query?: {
    scenery?: string[]
    searchRadius?: number
  }
}

export class SceneryService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: SceneryParams): Promise<any[] | Paginated<any>> {
    let sceneryArray = params.query?.scenery || []
    const radius = Number(params.query?.searchRadius) || 10

    const validSceneryOptions = ['forests', 'lakes_rivers', 'mountains', 'beaches']
    const validRadiusOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50]

    if (typeof sceneryArray === 'string') {
      sceneryArray = [sceneryArray]
    }

    // Validate scenery options
    const validSceneryArray = sceneryArray.filter((s) => validSceneryOptions.includes(s))
    if (validSceneryArray.length === 0) {
      throw new Error('Invalid scenery options.')
    }

    // Validate search radius
    if (!validRadiusOptions.includes(radius)) {
      throw new Error('Invalid search radius. Please choose from [10, 15, 20, 25, 30, 35, 40, 45, 50].')
    }

    // Fetch all cities along with their scenery counts from cache
    const citiesWithCounts = await this.sequelize.models.CitySceneryCache.findAll({
      include: [
        {
          model: this.sequelize.models.City
        }
      ],
      attributes: {
        include: validSceneryArray.map((scenery) => [`${scenery}${radius}`, `${scenery}${radius}`])
      }
    })

    const cityScores = citiesWithCounts.map((cityWithCount: any) => {
      let count = 0
      for (const scenery of validSceneryArray) {
        const column = `${scenery}${radius}`

        count += cityWithCount?.dataValues?.[column] || 0
      }

      return {
        city_id: cityWithCount?.City?.dataValues?.city_id,
        count
      }
    })

    const sortedCities = cityScores.sort((a: any, b: any) => b.count - a.count).slice(0, 30)

    let ranking = 1
    let previousCount = sortedCities[0].count
    const topCities = sortedCities.map((city: any, index: any) => {
      if (previousCount !== city.count) {
        ranking = index + 1
        previousCount = city.count
      }

      return {
        ...city,
        ranking
      }
    })

    if (topCities.length < 10) {
      console.log('obtained less than 10 cities from scenery')
    }

    return topCities
  }

  async get(id: Id, params?: SceneryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: SceneryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: SceneryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: SceneryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: SceneryParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

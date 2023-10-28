import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type {
  PublicServices,
  PublicServicesData,
  PublicServicesPatch,
  PublicServicesQuery
} from './public-services.schema'
import { Sequelize, Op } from 'sequelize'

export type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery }

export interface PublicServicesParams extends Params {
  query?: {
    publicServices?: string[]
  }
}

export class PublicServicesService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: PublicServicesParams): Promise<any[] | Paginated<any>> {
    const categoryMapping: { [key: string]: string[] } = {
      schools: ['School or Academy'],
      hospitals: ['Hospital/Hospice/Urgent Care Facility'],
      libraries: ['Library'],
      emergencyServices: ['Fire Department', 'Police Station'],
      airports: ['Airport or Airfield'],
      transitStations: [
        'Transportation Terminal',
        'Train Station, Trolley or Mass Transit Rail Station',
        'Bus Terminal'
      ],
      marineTerminals: ['Marine Terminal'],
      placesOfWorship: ['Place of Worship'],
      localParks: [
        'Community Center',
        'Convention Center',
        'Regional Park, Forest, or Recreation Area',
        'County Park, Forest, or Recreation Area',
        'County Subdivision Park, Forest, or Recreation Area',
        'Incorporated Place Park, Forest, or Recreation Area',
        'Private Park, Forest, or Recreation Area',
        'Other Park, Forest, or Recreation Area (quasi-public, independent park commission, etc.)'
      ]
    }

    let publicServicesArray = params.query?.publicServices
    if (typeof publicServicesArray === 'string') {
      publicServicesArray = [publicServicesArray]
    }

    const selectedCategories = publicServicesArray?.flatMap((key) => {
      const mappedCategories = categoryMapping[key]
      return mappedCategories ? mappedCategories.map((category) => ({ Feature_Class: category })) : []
    })

    const cities = await this.sequelize.models.City.findAll()

    const cityScores = await Promise.all(
      cities.map(async (city: any) => {
        const distance = Sequelize.literal(
          `(3959 * acos(cos(radians(${city.Latitude})) * cos(radians(LandMark.Y)) * cos(radians(LandMark.X) - radians(${city.Longitude})) + sin(radians(${city.Latitude})) * sin(radians(LandMark.Y))))`
        )
        const count = await this.sequelize.models.LandMark.count({
          include: [
            {
              model: this.sequelize.models.MTFCC,
              as: 'MTFCCAssociation',
              where: {
                [Op.or]: selectedCategories
              }
            }
          ],
          where: Sequelize.where(distance, '<=', 15)
        })

        return {
          city,
          count
        }
      })
    )

    cityScores.sort((a, b) => b.count - a.count)

    return cityScores
  }

  async get(id: Id, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: PublicServicesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

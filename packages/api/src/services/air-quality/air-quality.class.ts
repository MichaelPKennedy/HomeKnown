import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { AirQuality, AirQualityData, AirQualityPatch, AirQualityQuery } from './air-quality.schema'
import type { Application } from '../../declarations'

export type { AirQuality, AirQualityData, AirQualityPatch, AirQualityQuery }

export interface AirQualityParams extends Params {}

export class AirQualityService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: AirQualityParams): Promise<any[] | Paginated<any>> {
    const { sequelize } = this

    // Calculate a score for each city based on air quality. Lower values for pollutants is better.
    const citiesRankedByAirQuality = await sequelize.models.AirQuality.findAll({
      attributes: [
        'area_code',
        'CO_8hr_ppm',
        'Pb_3mo_ug_m3',
        'NO2_AM_ppb',
        'NO2_1hr_ppb',
        'O3_8hr_ppm',
        'PM10_24hr_ug_m3',
        'PM2_5_Wtd_AM_ug_m3',
        'PM2_5_24hr_ug_m3',
        'SO2_1hr_ppb',
        [
          sequelize.literal(`
            COALESCE(CO_8hr_ppm, 0) +
            COALESCE(Pb_3mo_ug_m3, 0) +
            COALESCE(NO2_AM_ppb, 0) +
            COALESCE(NO2_1hr_ppb, 0) +
            COALESCE(O3_8hr_ppm, 0) +
            COALESCE(PM10_24hr_ug_m3, 0) +
            COALESCE(PM2_5_Wtd_AM_ug_m3, 0) +
            COALESCE(PM2_5_24hr_ug_m3, 0) +
            COALESCE(SO2_1hr_ppb, 0)
          `),
          'totalPollutantScore'
        ]
      ],
      order: [[sequelize.literal('totalPollutantScore'), 'ASC']],
      limit: 30
    })
    //take area_code from citiesRankedByAirQuality and find the cities with that area_code
    const cities = await sequelize.models.City.findAll({
      where: {
        area_code: citiesRankedByAirQuality.map((city: any) => city.area_code)
      }
    })

    // Map the cities to their pollutant score
    const citiesWithPollutantScores = citiesRankedByAirQuality
      .map((city: any) => {
        const relatedCities = cities.filter((c: any) => c.area_code === city.area_code)
        return relatedCities.map((cityData: any) => ({
          city_id: cityData.city_id,
          totalPollutantScore: city.dataValues.totalPollutantScore
        }))
      })
      .flat()
      .slice(0, 30)

    return citiesWithPollutantScores
  }

  async get(id: Id, params?: AirQualityParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: AirQualityParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: AirQualityParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: AirQualityParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: AirQualityParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

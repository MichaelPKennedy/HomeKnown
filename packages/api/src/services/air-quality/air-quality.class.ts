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

    // Map and rank the cities by their pollutant score
    let ranking = 1
    let previousScore = 0
    const citiesWithPollutantScoresAndRanking = citiesRankedByAirQuality.map((city: any, index: any) => {
      const totalPollutantScore = city.dataValues.totalPollutantScore

      if (previousScore !== totalPollutantScore && previousScore !== null) {
        ranking = index + 1
      }
      previousScore = totalPollutantScore

      return {
        area_code: city.area_code,
        totalPollutantScore,
        ranking
      }
    })

    const areaCodes = citiesWithPollutantScoresAndRanking.map((c: any) => c.area_code)
    const cities = await sequelize.models.City.findAll({
      where: { area_code: areaCodes }
    })

    const rankedCitiesWithIds = citiesWithPollutantScoresAndRanking.map((cityScore: any) => {
      const cityData = cities.find((c: any) => c.area_code === cityScore.area_code)
      return {
        city_id: cityData.city_id,
        totalPollutantScore: cityScore.totalPollutantScore,
        ranking: cityScore.ranking
      }
    })

    return rankedCitiesWithIds
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
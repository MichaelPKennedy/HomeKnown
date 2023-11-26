import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Weather, WeatherData, WeatherPatch, WeatherQuery } from './weather.schema'

export type { Weather, WeatherData, WeatherPatch, WeatherQuery }
const { Sequelize } = require('sequelize')

const Op = Sequelize.Op

export interface WeatherParams extends Params {
  snowPreference?: 'none' | 'light' | 'heavy'
  rainPreference?: 'dry' | 'regular'
  temperatureData: [
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number },
    { month: string; temp?: number }
  ]
}
const monthToNumber: { [key: string]: number } = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}

type WhereCondition = {
  [key: string]: any
}

export class WeatherService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: Params): Promise<any[] | Paginated<any>> {
    const queryData = params.query as WeatherParams

    if (!queryData || !queryData.temperatureData) {
      throw new Error('Invalid query data provided.')
    }

    const { snowPreference, rainPreference, temperatureData } = queryData

    const whereConditions: WhereCondition[] = temperatureData.map((monthData) => {
      const monthNumber = monthToNumber[monthData.month]
      if (monthNumber === undefined) {
        throw new Error(`Invalid month: ${monthData.month}`)
      }

      const whereCondition: WhereCondition = {
        year: 2022,
        month: monthNumber
      }

      if (monthData.temp !== undefined) {
        whereCondition.avg_temp = {
          [Op.between]: [monthData.temp - 30, monthData.temp + 30]
        }
      }

      return whereCondition
    })

    try {
      const monthlyResults = await Promise.all(
        whereConditions.map(async (condition) => {
          return await this.sequelize.models.CityMonthlyWeatherCounty.findAll({
            where: condition
          })
        })
      )

      const flattenedResults = monthlyResults.flat()
      const scoredResults = await this.scoreResults(
        flattenedResults,
        temperatureData,
        snowPreference,
        rainPreference
      )

      const sortedResults = scoredResults.sort((a, b) => b.score - a.score)

      let rank = 1
      let previousScore = sortedResults[0]?.score

      const rankedResults = sortedResults.map((result, index) => {
        if (index > 0 && result.score !== previousScore) {
          rank++
          previousScore = result.score
        }
        return { ranking: rank, ...result }
      })

      const topCities = rankedResults.slice(0, 300)

      if (topCities.length < 10) {
        console.log('obtained less than 10 cities from weather')
      }

      return topCities
    } catch (error) {
      console.error('Error querying weather data:', error)
      throw new Error('Error querying weather data')
    }
  }

  async scoreResults(
    results: any[],
    temperatureData: WeatherParams['temperatureData'],
    snowPreference?: string,
    rainPreference?: string
  ): Promise<any[]> {
    // Group by city_id and calculate total snow and rain for the year
    const groupedResults = results.reduce((acc, curr) => {
      const cityData = curr.dataValues

      if (!acc[cityData.city_id]) {
        acc[cityData.city_id] = {
          city_id: cityData.city_id,
          snow: 0,
          rain: 0,
          monthlyData: []
        }
      }

      acc[cityData.city_id].snow += parseFloat(cityData.snow) || 0
      acc[cityData.city_id].rain += parseFloat(cityData.rain) || 0
      acc[cityData.city_id].monthlyData.push(cityData)

      return acc
    }, {})

    const citiesArray = Object.values(groupedResults)

    const scoredResults = citiesArray.map((city: any) => {
      let score = 0

      temperatureData.forEach((monthData) => {
        const monthNumber = monthToNumber[monthData.month]
        const monthResult = city.monthlyData.find((m: any) => m.month === monthNumber)
        if (monthResult && monthData.temp !== undefined) {
          const tempDiff = Math.abs(parseFloat(monthResult.avg_temp) - monthData.temp)
          if (tempDiff <= 2) {
            score += 15
          } else if (tempDiff <= 5) {
            score += 10
          } else if (tempDiff <= 10) {
            score += 5
          } else if (tempDiff >= 25) {
            score -= 15
          } else if (tempDiff >= 20) {
            score -= 10
          } else if (tempDiff >= 15) {
            score -= 5
          }
        }
      })

      if (snowPreference) {
        score += this.getSnowScore(city.snow, snowPreference)
      }

      if (rainPreference) {
        score += this.getRainScore(city.rain, rainPreference)
      }

      return { ...city, score }
    })

    return scoredResults
  }

  getSnowScore(totalSnow: number, preference: string): number {
    switch (preference) {
      case 'none':
        return totalSnow === 0 ? 10 : 0
      case 'light':
        return totalSnow < 30 ? 10 : 0
      case 'heavy':
        return totalSnow >= 30 ? 10 : 0
      default:
        return 0
    }
  }

  getRainScore(totalRain: number, preference: string): number {
    switch (preference) {
      case 'dry':
        return totalRain < 50 ? 20 : 0
      case 'regular':
        return totalRain >= 50 ? 20 : 0
      default:
        return 0
    }
  }

  async get(id: Id, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: WeatherParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

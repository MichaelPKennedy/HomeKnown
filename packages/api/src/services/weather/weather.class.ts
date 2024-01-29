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
          [Op.between]: [monthData.temp - 0.2, monthData.temp + 0.2]
        }
      }

      return whereCondition
    })

    try {
      const countyResults = await Promise.all(
        whereConditions.map(async (condition) => {
          return await this.sequelize.models.CountyMonthlyWeather.findAll({
            where: condition,
            attributes: ['avg_temp', 'precip', 'month'],
            include: [
              {
                model: this.sequelize.models.County,
                include: [
                  {
                    model: this.sequelize.models.City,
                    attributes: ['city_id', 'county_fips']
                  }
                ]
              }
            ]
          })
        })
      )

      const flattenedCountyResults = countyResults.flat()

      // Fetch city-level snow data
      const cityIds = flattenedCountyResults.reduce((acc, county) => {
        county.County.Cities.forEach((city: any) => acc.add(city.city_id))
        return acc
      }, new Set())

      const citySnow = await this.sequelize.models.CitySnowCache.findAll({
        where: {
          city_id: Array.from(cityIds),
          year: 2022
        },
        attributes: ['city_id', 'total_snow']
      })

      const citySnowDataMap = citySnow.reduce((acc: any, curr: any) => {
        acc[curr.city_id] = curr.total_snow / 5
        return acc
      }, {})

      const scoredResults = await this.scoreResults(
        flattenedCountyResults,
        citySnowDataMap,
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
        console.log('Obtained less than 10 cities from weather')
      }

      return topCities
    } catch (error) {
      console.error('Error querying weather data:', error)
      throw new Error('Error querying weather data')
    }
  }

  async scoreResults(
    countyResults: any[],
    citySnowDataMap: any[],
    temperatureData: WeatherParams['temperatureData'],
    snowPreference?: string,
    rainPreference?: string
  ): Promise<any[]> {
    // Group county results by city_id
    const groupedResults = countyResults.reduce((acc, curr) => {
      curr.County.Cities.forEach((city: any) => {
        if (!acc[city.city_id]) {
          acc[city.city_id] = {
            city_id: city.city_id,
            county: city.county_fips,
            rain: 0,
            snow: 0,
            monthlyData: []
          }
        }

        // Aggregating rain data and monthly data for each city
        acc[city.city_id].rain += parseFloat(curr.precip) || 0
        acc[city.city_id].monthlyData.push({
          month: curr.month,
          avg_temp: curr.avg_temp
        })
      })
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
          score += this.calculateTemperatureScore(tempDiff)
        }
      })

      if (rainPreference) {
        score += this.getRainScore(city.rain, rainPreference)
      }

      if (snowPreference) {
        const averageSnow = citySnowDataMap[city.city_id] || 0
        score += this.getSnowScore(averageSnow, snowPreference)
      }

      return { ...city, score }
    })

    return scoredResults
  }

  calculateTemperatureScore(tempDiff: number): number {
    if (tempDiff <= 2) return 15
    if (tempDiff <= 5) return 10
    if (tempDiff <= 10) return 5
    if (tempDiff >= 25) return -15
    if (tempDiff >= 20) return -10
    if (tempDiff >= 15) return -5
    return 0
  }

  getSnowScore(totalSnow: number, preference: string): number {
    switch (preference) {
      case 'none':
        return totalSnow === 0 ? 50 : 0
      case 'light':
        if (totalSnow < 20) {
          return 10 - Math.floor(totalSnow / 2)
        }
        return 0
      case 'heavy':
        if (totalSnow >= 20) {
          return 30 + Math.floor((totalSnow - 20) / 2)
        }
        return 0
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

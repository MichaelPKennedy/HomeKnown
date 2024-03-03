import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Weather, WeatherData, WeatherPatch, WeatherQuery } from './weather.schema'
import { WhereOptions } from 'sequelize'

export type { Weather, WeatherData, WeatherPatch, WeatherQuery }
const { Sequelize } = require('sequelize')

const Op = Sequelize.Op

export interface WeatherParams extends Params {
  snowPreference?: 'none' | 'light' | 'heavy'
  rainPreference?: 'dry' | 'regular'
  humidityPreference: number
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
  minPopulation: number
  maxPopulation: number
  includedStates: number[]
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

type CityWhereCondition = {
  pop_2022?: {}
  state_code?: {
    [key: string]: number[]
  }
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

    const {
      snowPreference,
      rainPreference,
      temperatureData,
      minPopulation,
      maxPopulation,
      includedStates,
      humidityPreference
    } = queryData

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

    const humidityRange = this.getHumidityRange(humidityPreference)

    const humidityWhereCondition = {
      avg_humidity: {
        [Op.between]: humidityRange
      }
    }

    let countyWhereConditions = Sequelize.where(Sequelize.literal('1'), '1')

    let tempConditions: WhereOptions[] = []

    temperatureData.forEach((monthData) => {
      if (monthData.temp !== undefined) {
        const condition: WhereOptions = {
          [monthData.month]: {
            [Op.between]: [monthData.temp - 30, monthData.temp + 30]
          }
        }
        tempConditions.push(condition)
      }
    })

    if (tempConditions.length > 0) {
      countyWhereConditions = {
        [Op.and]: tempConditions
      }
    }

    let citiesScoredResults = []

    try {
      const matchingCounties = await this.sequelize.models.CountyAverageTemp.findAll({
        where: countyWhereConditions,
        include: [
          {
            model: this.sequelize.models.County,
            required: true,
            include: [
              {
                model: this.sequelize.models.City,
                attributes: ['city_id', 'county_fips'],
                required: true,
                where: cityWhereCondition,
                include: [
                  {
                    model: this.sequelize.models.CityAverageTemp,
                    attributes: ['avg_humidity'],
                    required: true,
                    where: humidityWhereCondition
                  }
                ]
              }
            ]
          }
        ]
      })

      const cities = matchingCounties.reduce((acc: any, county: any) => {
        const cities = county.County.Cities.map((city: any) => ({
          ...city.dataValues,
          countyData: county.dataValues
        }))
        return acc.concat(cities)
      }, [])

      const cityIds = cities.map((city: any) => city.city_id)

      const citySnow = await this.sequelize.models.CitySnowCache.findAll({
        where: { city_id: cityIds, year: 2022 },
        attributes: ['city_id', 'total_snow']
      })

      const citySnowDataMap = citySnow.reduce((acc: any, curr: any) => {
        acc[curr.city_id] = curr.total_snow / 5
        return acc
      }, {})

      citiesScoredResults = cities.map((city: any) => {
        let score = 0

        temperatureData.forEach((monthData) => {
          if (monthData.temp !== undefined) {
            const tempDiff = Math.abs(parseFloat(city.countyData[monthData.month]) - monthData.temp)
            score += this.calculateTemperatureScore(tempDiff)
          }
        })

        if (rainPreference) {
          score += this.getRainScore(parseFloat(city.countyData.rain), rainPreference)
        }

        if (snowPreference && citySnowDataMap[city.city_id] !== undefined) {
          score += this.getSnowScore(citySnowDataMap[city.city_id], snowPreference)
        }

        return { ...city, score }
      })

      citiesScoredResults.sort((a: any, b: any) => b.score - a.score)

      let rank = 1
      let previousScore = citiesScoredResults[0]?.score

      const rankedResults = citiesScoredResults.map((result: any, index: any) => {
        if (index > 0 && result.score !== previousScore) {
          rank++
          previousScore = result.score
        }
        return { ranking: rank, ...result, score: result.score }
      })

      const topCities = rankedResults.slice(0, 10000)

      if (topCities.length < 10) {
        console.log('Obtained less than 10 cities from weather')
      }

      return topCities
    } catch (error) {
      console.error('Error querying weather data:', error)
      throw new Error('Error querying weather data')
    }
  }

  getHumidityRange(humidityPreference: number) {
    let range
    switch (humidityPreference) {
      case 25:
        range = [1, 49.99]
        break
      case 50:
        range = [50, 67.99]
        break
      case 75:
        range = [68, 100]
        break
      default:
        throw new Error('Invalid humidity preference')
    }
    return range
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

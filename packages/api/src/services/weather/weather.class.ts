import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { WeatherSchema, WeatherData, WeatherPatch, WeatherQuery } from './weather.schema'
import type { Application } from '../../declarations'
const { Sequelize } = require('sequelize')

const Op = Sequelize.Op

import { CityWeather } from '../../models/city-weather.model'
import { Weather } from '../../models/weather.model'
import { State } from '../../models/state.model'

export type { WeatherSchema, WeatherData, WeatherPatch, WeatherQuery }

interface QueryParams {
  query: string
}

export interface WeatherParams extends Params {
  query?: {
    temperature?: number
    temperaturePreference?: 'mild' | 'distinct'
    climatePreference?: 'warmer' | 'cooler'
    snowPreference?: 'none' | 'light' | 'heavy'
    rainPreference?: 'dry' | 'regular'
    importantSeason?: 'winter' | 'summer' | 'spring' | 'fall'
    seasonPreferenceDetail?:
      | 'mildWinter'
      | 'coldWinter'
      | 'snowyWinter'
      | 'mildSummer'
      | 'hotSummer'
      | 'drySummer'
      | 'warmSpring'
      | 'coolSpring'
      | 'drySpring'
      | 'warmFall'
      | 'coolFall'
      | 'dryFall'
  }
}

type WhereCondition = {
  [key: string]: any
}

enum ConditionKey {
  RainQuery,
  SnowQuery,
  TempQuery
}

export class WeatherService implements ServiceMethods<any> {
  app: Application
  sequelize: any // You can also type it more specifically if needed.

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  private conditionsMap: Map<ConditionKey, any> = new Map()

  private setCondition(key: ConditionKey, value: any) {
    this.conditionsMap.set(key, value)
  }

  private getAllConditions(): any[] {
    return Array.from(this.conditionsMap.values())
  }

  private modifyQueryForRetry(
    whereCityCondition: WhereCondition,
    retryCount: number,
    temperature: number,
    havingConditions: any,
    temperaturePreference: any
  ): { whereCityCondition: WhereCondition; havingConditions: any } {
    switch (retryCount) {
      case 1:
        havingConditions.estimatedYearlyAvgTemp = { [Op.between]: [temperature - 10, temperature + 10] }
        console.log('retry 1')
        break

      case 2:
        this.setCondition(
          ConditionKey.RainQuery,
          this.sequelize.literal(
            'jan_prec + feb_prec + mar_prec + apr_prec + may_prec + jun_prec + jul_prec + aug_prec + sep_prec + oct_prec + nov_prec + dec_prec BETWEEN 0 AND 30'
          )
        )
        if (temperaturePreference === 'distinct') {
          havingConditions['seasonDifference'] = {
            [Op.gte]: 35
          }
        }
        console.log('retry 2')
        break

      case 3:
        if (temperaturePreference === 'distinct') {
          havingConditions['seasonDifference'] = {
            [Op.gte]: 30
          }
        }
        console.log('retry 3')
        break

      // Add more conditions as needed.
    }
    return { whereCityCondition, havingConditions }
  }

  private async queryForCities(
    whereCityCondition: WhereCondition,
    havingConditions: any,
    attributesInclude: any
  ) {
    return await CityWeather.findAll({
      where: whereCityCondition,
      attributes: {
        include: attributesInclude
      },
      having: havingConditions,
      include: [
        {
          model: State
        }
      ],
      limit: 20
    })
  }

  async find(params: WeatherParams): Promise<any[] | Paginated<any>> {
    console.log('weather params', params)
    const queryData = params.query

    if (!queryData) {
      throw new Error('No query data provided.')
    }

    const { temperature, temperaturePreference, snowPreference, rainPreference } = queryData

    if (typeof temperature === 'undefined') {
      throw new Error('Temperature must be provided.')
    }

    // Clear conditionsMap for the new call
    this.conditionsMap.clear()

    // Step 1: Get the average temperature for all states
    const allStatesTemperature = await Weather.findAll({
      attributes: [
        'state_code',
        [this.sequelize.fn('AVG', this.sequelize.col('avgTemp')), 'avg_temperature']
      ],
      include: [
        {
          model: State,
          attributes: ['state', 'state_code', 'state_abbrev']
        }
      ],
      group: ['Weather.state_code', 'State.state_code', 'State.state']
    })

    // Compute average temperature for the entire year for each city
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const monthlyAverages = months.map((month) => `((${month}_high + ${month}_low) / 2)`)
    const estimatedYearlyAvgTemp = `(${monthlyAverages.join(' + ')}) / 12`

    const yearlyPrecipitation = months.map((month) => `${month}_prec`).join(' + ')
    const yearlySnow = months.map((month) => `${month}_snow`).join(' + ')

    const temperatureCondition = { [Op.between]: [temperature - 5, temperature + 5] }

    // Set snow condition
    if (snowPreference === 'none') {
      this.setCondition(ConditionKey.SnowQuery, this.sequelize.literal(`${yearlySnow} = 0`))
    } else if (snowPreference === 'light') {
      this.setCondition(ConditionKey.SnowQuery, this.sequelize.literal(`${yearlySnow} BETWEEN 0.1 AND 10`))
    } else {
      this.setCondition(ConditionKey.SnowQuery, this.sequelize.literal(`${yearlySnow} > 10`))
    }

    // Set rain condition
    const precipitationSumLiteral =
      'jan_prec + feb_prec + mar_prec + apr_prec + may_prec + jun_prec + jul_prec + aug_prec + sep_prec + oct_prec + nov_prec + dec_prec'

    if (rainPreference === 'dry') {
      this.setCondition(ConditionKey.RainQuery, this.sequelize.literal(`${precipitationSumLiteral} <= 20`))
    } else {
      this.setCondition(ConditionKey.RainQuery, this.sequelize.literal(`${precipitationSumLiteral} > 5`))
    }

    const attributesInclude: (string | [any, string])[] = [
      [this.sequelize.literal(estimatedYearlyAvgTemp), 'estimatedYearlyAvgTemp'],
      [this.sequelize.literal(yearlyPrecipitation), 'yearlyPrecipitation']
    ]

    // Define the initial conditions for the query
    let whereCityCondition: WhereCondition = {
      area_code: { [Op.ne]: null }
    }
    let havingConditions: any = {
      estimatedYearlyAvgTemp: temperatureCondition
    }

    // Check if the user wants distinct seasons
    if (temperaturePreference === 'distinct') {
      const highestMonthlyAvg = `GREATEST(${months.map((month) => `${month}_high`).join(', ')})`
      const lowestMonthlyAvg = `LEAST(${months.map((month) => `${month}_low`).join(', ')})`

      attributesInclude.push(
        [this.sequelize.literal(highestMonthlyAvg), 'highestMonthlyAvg'],
        [this.sequelize.literal(lowestMonthlyAvg), 'lowestMonthlyAvg']
      )

      const seasonDifferenceLiteral = `(${highestMonthlyAvg} - ${lowestMonthlyAvg})`
      attributesInclude.push([this.sequelize.literal(seasonDifferenceLiteral), 'seasonDifference'])

      // Set the having condition for distinct seasons
      havingConditions['seasonDifference'] = {
        [Op.gte]: 40
      }
    }

    const MAX_RETRIES = 3
    let retryCount = 0

    // Apply the conditions to the whereCityCondition object
    whereCityCondition[Op.and] = this.getAllConditions()

    // Make the initial query
    let topCities = await this.queryForCities(whereCityCondition, havingConditions, attributesInclude)

    // Retry logic if the initial query returned no results
    while (topCities.length === 0 && retryCount < MAX_RETRIES) {
      retryCount++
      console.log('WhereCityCondition', whereCityCondition)
      const modifiedConditions = this.modifyQueryForRetry(
        whereCityCondition,
        retryCount,
        temperature,
        havingConditions,
        temperaturePreference
      )
      whereCityCondition = modifiedConditions.whereCityCondition
      havingConditions = modifiedConditions.havingConditions

      // Reapply the conditions to the whereCityCondition object before making the query
      whereCityCondition[Op.and] = this.getAllConditions()

      // Make the retry query
      topCities = await this.queryForCities(whereCityCondition, havingConditions, attributesInclude)
    }

    const weatherDataForAllStates = await Weather.findAll({
      attributes: ['state_code', 'month', 'avgTemp'],
      order: ['state_code', 'month']
    })

    // Convert the weather data into a format suitable for graphing
    const graphData = weatherDataForAllStates.reduce((acc: any, record: any) => {
      const stateCode = record.getDataValue('state_code')
      const month = record.getDataValue('month')
      const avgTemperature = record.getDataValue('avgTemp')

      if (!acc[stateCode]) {
        acc[stateCode] = { stateCode, monthlyAvg: {} }
      }

      acc[stateCode].monthlyAvg[month] = avgTemperature

      return acc
    }, {})

    return {
      allStatesTemp: allStatesTemperature,
      topCities: topCities,
      graphData: Object.values(graphData)
    } as any
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

import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Survey, SurveyData, SurveyPatch, SurveyQuery } from './survey.schema'

export type { Survey, SurveyData, SurveyPatch, SurveyQuery }

interface QueryParams {
  query: string
}
export interface SurveyParams extends Params {
  query?: QueryParams
}

export interface SurveyFormData {
  data: {
    temperature: number
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
    minSalary?: number
    jobLevel?: 'entry-level' | 'senior' | 'both'
    futureAspiration?: string
    selectedJobs?: { naics: string; occ: string }[]
    livingPreference?: 'city' | 'suburb' | 'rural'
    housingBudget?: number
    settingPreference?: string
    hasChildren?: boolean
    lowCrimePriority?: boolean
    publicTransportation?: boolean
    commuteTime?: string
    proximityAirportHighway?: boolean
    culturalOfferings?: boolean
    nightlifeImportance?: boolean
    landscapeFeatures?: string[]
    recreationalInterests?: string[]
  }
}

export class SurveyService implements ServiceMethods<any> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(data: SurveyFormData, params?: SurveyParams): Promise<any> {
    const jobData = this.parseJobData(data)
    const weatherData = this.parseWeatherData(data)

    const jobResponse = await this.getIndustryResponse(jobData)
    const weatherResponse = await this.getWeatherResponse(weatherData)
    console.log('weather response states:', weatherResponse.topStates)
    // filter through jobResponse.topCities and weatherResponse.topCities to find matches

    const topCitiesMatches = weatherResponse.topCities.filter((weatherCity: any) => {
      return jobResponse.topCities.some((jobCity: any) => {
        const regex = new RegExp(`^${weatherCity.city}-|-${weatherCity.city}-|-${weatherCity.city}$`)
        console.log(jobCity.Area.area_title, weatherCity.city, regex.test(jobCity.Area.area_title))
        return regex.test(jobCity.Area.area_title) || weatherCity.city === jobCity.Area.area_title
      })
    })

    console.log('Matched top cities:', topCitiesMatches)
    console.log('weatherResponse.topCities', weatherResponse.topCities)
    console.log('jobResponse.topCities', jobResponse.topCities)
    let topCities
    if (topCitiesMatches) {
      topCities = topCitiesMatches
    } else {
      //take top 5 cities from weatherResponse.topCities and jobResponse.topCities
      topCities = [...weatherResponse.topCities.slice(0, 5), ...jobResponse.topCities.slice(0, 5)]
    }

    return {
      jobResponse,
      weatherResponse,
      topCities
    }
  }

  parseJobData(data: SurveyFormData): any {
    const { minSalary, jobLevel, selectedJobs } = data.data

    return {
      minSalary,
      jobLevel,
      selectedJobs
    }
  }

  parseWeatherData(data: SurveyFormData): any {
    const {
      temperature,
      temperaturePreference,
      climatePreference,
      snowPreference,
      rainPreference,
      importantSeason,
      seasonPreferenceDetail
    } = data.data

    return {
      temperature,
      temperaturePreference,
      climatePreference,
      snowPreference,
      rainPreference,
      importantSeason,
      seasonPreferenceDetail
    }
  }

  async getIndustryResponse(data: any): Promise<any> {
    const industryService = this.app.service('industry')

    try {
      const response = await industryService.find(data)
      return response
    } catch (error) {
      console.error('Error querying the industry service:', error)
      throw new Error('Unable to fetch data from industry service.')
    }
  }

  async getWeatherResponse(data: any): Promise<any> {
    const weatherService = this.app.service('weather')
    try {
      const response = await weatherService.find(data)
      return response
    } catch (error) {
      console.error('Error querying the industry service:', error)
      throw new Error('Unable to fetch data from industry service.')
    }
  }

  async find(params: SurveyParams): Promise<any[] | Paginated<any>> {
    return []
  }

  async get(id: Id, params?: SurveyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: SurveyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: SurveyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: SurveyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

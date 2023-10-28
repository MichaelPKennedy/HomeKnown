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
    publicServices?: string[]
    searchRadius?: number
    housingType?: 'rent' | 'buy'
    homeMin?: number
    homeMax?: number
    rentMin?: number
    rentMax?: number
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
    const recreationData = data.data.recreationalInterests
    const housingData = this.parseHousingData(data)
    const publicServicesData = this.parsePublicServicesData(data)

    try {
      const [jobResponse, weatherResponse, recreationResponse, housingResponse, publicServicesResponse] =
        await Promise.all([
          this.getIndustryResponse(jobData),
          this.getWeatherResponse(weatherData),
          this.getRecreationResponse(recreationData),
          this.getHousingResponse(housingData),
          this.getPublicServicesResponse(publicServicesData)
        ])

      const topCitiesMatches = weatherResponse.topCities.filter((weatherCity: any) => {
        return jobResponse.topCities.some((jobCity: any) => {
          const regex = new RegExp(`^${weatherCity.city}-|-${weatherCity.city}-|-${weatherCity.city}$`)

          return regex.test(jobCity.Area.area_title) || weatherCity.city === jobCity.Area.area_title
        })
      })

      let topCities
      if (topCitiesMatches) {
        topCities = topCitiesMatches
      } else {
        topCities = [...weatherResponse.topCities.slice(0, 5), ...jobResponse.topCities.slice(0, 5)]
      }

      //TODO: make a call to non-existent function which will normalize the responses and get all necessary missing data for each of the selected top cites and states

      return {
        jobResponse,
        weatherResponse,
        recreationResponse,
        topCities
      }
    } catch (error) {
      console.error('Error processing requests:', error)
      throw new Error('Unable to process requests.')
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

  parseHousingData(data: SurveyFormData): any {
    const { housingType, homeMin, homeMax, rentMin, rentMax } = data.data

    return {
      housingType,
      homeMin,
      homeMax,
      rentMin,
      rentMax
    }
  }

  parsePublicServicesData(data: SurveyFormData): any {
    const { searchRadius, publicServices } = data.data

    return {
      searchRadius,
      publicServices
    }
  }

  async getIndustryResponse(data: any): Promise<any> {
    const industryService = this.app.service('industry')

    try {
      const response = await industryService.find({
        query: {
          ...data
        }
      })
      return response
    } catch (error) {
      console.error('Error querying the industry service:', error)
      throw new Error('Unable to fetch data from industry service.')
    }
  }

  async getWeatherResponse(data: any): Promise<any> {
    const weatherService = this.app.service('weather')
    try {
      const response = await weatherService.find({
        query: {
          ...data
        }
      })
      return response
    } catch (error) {
      console.error('Error querying the industry service:', error)
      throw new Error('Unable to fetch data from industry service.')
    }
  }

  async getRecreationResponse(data: any): Promise<any> {
    const recreationService = this.app.service('recreation')
    try {
      const response = await recreationService.find({
        query: {
          recreationalInterests: data
        }
      })
      return response
    } catch (error) {
      console.error('Error querying the recreation service:', error)
      throw new Error('Unable to fetch data from recreation service.')
    }
  }
  async getHousingResponse(data: any): Promise<any> {
    const housingService = this.app.service('housing')
    try {
      const response = await housingService.find({
        query: {
          ...data
        }
      })
      return response
    } catch (error) {
      console.error('Error querying the housing service:', error)
      throw new Error('Unable to fetch data from housing service.')
    }
  }

  async getPublicServicesResponse(data: any): Promise<any> {
    console.log('public service data', data)
    const publicServicesService = this.app.service('public-services')
    try {
      const response = await publicServicesService.find({
        query: {
          publicServices: data.publicServices,
          searchRadius: data.searchRadius
        }
      })
      return response
    } catch (error) {
      console.error('Error querying the public services service:', error)
      throw new Error('Unable to fetch data from public services service.')
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

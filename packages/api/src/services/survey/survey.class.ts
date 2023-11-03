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
    snowPreference?: 'none' | 'light' | 'heavy'
    rainPreference?: 'dry' | 'regular'
    minSalary?: number
    jobLevel?: 'entry-level' | 'senior' | 'both'
    selectedJobs?: { naics: string; occ: string }[]
    livingPreference?: 'city' | 'suburb' | 'rural'
    recreationalInterests?: string[]
    publicServices?: string[]
    scenery?: string[]
    searchRadius?: number
    housingType?: 'rent' | 'buy'
    homeMin?: number
    homeMax?: number
    rentMin?: number
    rentMax?: number
    temperatureData: [
      { month: 'Jan'; temp?: number },
      { month: 'Feb'; temp?: number },
      { month: 'Mar'; temp?: number },
      { month: 'Apr'; temp?: number },
      { month: 'May'; temp?: number },
      { month: 'Jun'; temp?: number },
      { month: 'Jul'; temp?: number },
      { month: 'Aug'; temp?: number },
      { month: 'Sep'; temp?: number },
      { month: 'Oct'; temp?: number },
      { month: 'Nov'; temp?: number },
      { month: 'Dec'; temp?: number }
    ]
    weights: {
      costOfLivingWeight?: number
      recreationalActivitiesWeight?: number
      weatherWeight?: number
      jobOpportunityWeight?: number
      publicServicesWeight?: number
      crimeRateWeight?: number
      sceneryWeight?: number
      airQualityWeight?: number
      totalAvailablePoints?: number
    }
  }
}

export class SurveyService implements ServiceMethods<any> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  scoreCities(
    job: any,
    weather: any,
    recreation: any,
    housing: any,
    publicServices: any,
    scenery: any,
    airQuality: any,
    crime: any,
    weights: any
  ): any {
    console.log('job', job)

    const jobCities = job.topCities.map((city: any) => city.city_id)
    const weatherCities = weather.map((city: any) => city.city_id)
    const recreationCities = recreation.map((city: any) => city.city_id)
    const housingCities = housing.map((city: any) => city.city_id)
    const publicServicesCities = publicServices.map((city: any) => city.city_id)
    const sceneryCities = scenery.map((city: any) => city.city_id)
    const airQualityCities = airQuality.map((city: any) => city.city_id)
    const crimeCities = crime.map((city: any) => city.city_id)

    const allCities = [
      ...jobCities,
      ...weatherCities,
      ...recreationCities,
      ...housingCities,
      ...publicServicesCities,
      ...sceneryCities,
      ...airQualityCities,
      ...crimeCities
    ]
    console.log('jobCities.length', jobCities.length)
    console.log('weatherCities.length', weatherCities.length)
    console.log('recreationCities.length', recreationCities.length)
    console.log('housingCities.length', housingCities.length)
    console.log('publicServicesCities.length', publicServicesCities.length)
    console.log('sceneryCities.length', sceneryCities.length)
    console.log('airQualityCities.length', airQualityCities.length)
    console.log('crimeCities.length', crimeCities.length)
    console.log('allCities.length', allCities.length)

    const cityCounts = allCities.reduce((acc: { [key: number]: number }, city: number) => {
      acc[city] = (acc[city] || 0) + 1
      return acc
    }, {})
    const sortedByCount = Object.keys(cityCounts)
      .map((city) => ({
        city_id: Number(city),
        count: cityCounts[city]
      }))
      .sort((a, b) => b.count - a.count)

    console.log('sorted cities by count', sortedByCount)

    return sortedByCount.slice(0, 10)
  }

  async create(data: SurveyFormData, params?: SurveyParams): Promise<any> {
    console.log('data', data)
    const jobData = this.parseJobData(data)
    const weatherData = this.parseWeatherData(data)
    const recreationData = data.data.recreationalInterests
    const housingData = this.parseHousingData(data)
    const publicServicesData = this.parsePublicServicesData(data)
    const sceneryData = this.parseSceneryData(data)
    const weights = data.data.weights

    try {
      const [
        jobResponse,
        weatherResponse,
        recreationResponse,
        housingResponse,
        publicServicesResponse,
        sceneryResponse,
        airQualityResponse,
        crimeResponse
      ] = await Promise.all([
        this.getIndustryResponse(jobData),
        this.getWeatherResponse(weatherData),
        this.getRecreationResponse(recreationData),
        this.getHousingResponse(housingData),
        this.getPublicServicesResponse(publicServicesData),
        this.getSceneryResponse(sceneryData),
        this.getAirQualityResponse(),
        this.getCrimeResponse()
      ])

      const topTen = this.scoreCities(
        jobResponse,
        weatherResponse,
        recreationResponse,
        housingResponse,
        publicServicesResponse,
        sceneryResponse,
        airQualityResponse,
        crimeResponse,
        weights
      )

      return {
        jobResponse,
        weatherResponse,
        recreationResponse
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
    const { temperatureData, snowPreference, rainPreference } = data.data

    return {
      temperatureData,
      snowPreference,
      rainPreference
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

  parseSceneryData(data: SurveyFormData): any {
    const { searchRadius, scenery } = data.data

    return {
      searchRadius,
      scenery
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

  async getSceneryResponse(data: any): Promise<any> {
    const sceneryService = this.app.service('scenery')
    try {
      const response = await sceneryService.find({
        query: {
          scenery: data.scenery,
          searchRadius: data.searchRadius
        }
      })
      return response
    } catch (error) {
      console.error('Error querying the scenery service:', error)
      throw new Error('Unable to fetch data from scenery service.')
    }
  }

  async getAirQualityResponse(): Promise<any> {
    const airQualityService = this.app.service('air-quality')
    try {
      const response = await airQualityService.find({
        query: {}
      })
      return response
    } catch (error) {
      console.error('Error querying the air quality service:', error)
      throw new Error('Unable to fetch data from air quality service.')
    }
  }

  async getCrimeResponse(): Promise<any> {
    const crimeService = this.app.service('crime')
    try {
      const response = await crimeService.find({
        query: {}
      })
      return response
    } catch (error) {
      console.error('Error querying the crime service:', error)
      throw new Error('Unable to fetch data from crime service.')
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

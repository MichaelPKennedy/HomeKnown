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
    // Parsing the form data
    console.log('data', data)
    const jobData = this.parseJobData(data)
    // const livingPreferenceData = this.parseWeatherData(data)

    console.log('job data', jobData)

    const jobResponse = await this.getIndustryResponse(jobData)
    // const weatherResponse = await this.getWeatherResponse(livingPreferenceData)

    return {
      jobResponse
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
    // Extract and format data for the living preference API
    return {
      livingPreference: data.data.livingPreference,
      housingBudget: data.data.housingBudget
      // ... other necessary data
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
    // Use this.app or any other mechanism to send data to the living preference-related API
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

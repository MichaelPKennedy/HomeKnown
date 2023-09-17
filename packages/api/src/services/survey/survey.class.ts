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
  temperature: number
  job?: string
  partnerJob?: string
  desiredSalary?: number
  minSalary?: number
  jobLevel?: 'entry-level' | 'senior'
  wagePriority?: number
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
  industries?: string[]
}

export class SurveyService implements ServiceMethods<any> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(data: SurveyFormData, params?: SurveyParams): Promise<any> {
    // Parsing the form data
    const jobData = this.parseJobData(data)
    const livingPreferenceData = this.parseWeatherData(data)

    const jobResponse = await this.getIndustryResponse(jobData)
    const weatherResponse = await this.getWeatherResponse(livingPreferenceData)

    return {
      jobResponse,
      weatherResponse
    }
  }

  parseJobData(data: SurveyFormData): any {
    // Extract and format data for the job API
    const {
      job,
      partnerJob,
      desiredSalary,
      minSalary,
      jobLevel,
      wagePriority,
      futureAspiration,
      selectedJobs
    } = data

    return {
      job,
      partnerJob,
      desiredSalary,
      minSalary,
      jobLevel,
      wagePriority,
      futureAspiration,
      selectedJobs
    }
  }

  parseWeatherData(data: SurveyFormData): any {
    // Extract and format data for the living preference API
    return {
      livingPreference: data.livingPreference,
      housingBudget: data.housingBudget
      // ... other necessary data
    }
  }

  async getIndustryResponse(data: any): Promise<any> {
    // Use this.app or any other mechanism to send data to the job-related API
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

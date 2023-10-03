'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SurveyService = void 0
class SurveyService {
  constructor(app) {
    this.app = app
  }
  async create(data, params) {
    const jobData = this.parseJobData(data)
    const weatherData = this.parseWeatherData(data)
    const jobResponse = await this.getIndustryResponse(jobData)
    const weatherResponse = await this.getWeatherResponse(weatherData)

    return {
      jobResponse,
      weatherResponse
    }
  }
  parseJobData(data) {
    const { minSalary, jobLevel, selectedJobs } = data.data
    return {
      minSalary,
      jobLevel,
      selectedJobs
    }
  }
  parseWeatherData(data) {
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
  async getIndustryResponse(data) {
    const industryService = this.app.service('industry')
    try {
      const response = await industryService.find(data)
      return response
    } catch (error) {
      console.error('Error querying the industry service:', error)
      throw new Error('Unable to fetch data from industry service.')
    }
  }
  async getWeatherResponse(data) {
    const weatherService = this.app.service('weather')
    try {
      const response = await weatherService.find(data)
      return response
    } catch (error) {
      console.error('Error querying the industry service:', error)
      throw new Error('Unable to fetch data from industry service.')
    }
  }
  async find(params) {
    return []
  }
  async get(id, params) {
    throw new Error('Method not implemented.')
  }
  async update(id, data, params) {
    throw new Error('Method not implemented.')
  }
  async patch(id, data, params) {
    throw new Error('Method not implemented.')
  }
  async remove(id, params) {
    throw new Error('Method not implemented.')
  }
}
exports.SurveyService = SurveyService
//# sourceMappingURL=survey.class.js.map

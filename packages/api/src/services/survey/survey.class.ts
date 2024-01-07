import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { SurveyData, SurveyPatch, WeightKeys, RecreationalInterestKeys } from './survey.schema'
import { surveyDataValidator, RecreationalInterestMappings } from './survey.schema'
import { Op } from 'sequelize'
import { calculateDistance } from '../../utils'

export type { SurveyData, SurveyPatch }

interface QueryParams {
  query: string
}
export interface SurveyParams extends Params {
  query?: QueryParams
}

const years: string[] = []
for (let year = 2018; year <= 2023; year++) {
  ;[
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ].forEach((month) => {
    years.push(`${month}_${year}`)
  })
}

export class SurveyService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async create(data: SurveyData, params?: SurveyParams): Promise<any> {
    const validData = surveyDataValidator(data)
    if (!validData) {
      throw new Error('Invalid survey data')
    }
    const jobData = this.parseJobData(data)
    const weatherData = this.parseWeatherData(data)
    const recreationData = this.parseRecreationData(data)
    const housingData = this.parseHousingData(data)
    const publicServicesData = this.parsePublicServicesData(data)
    const sceneryData = this.parseSceneryData(data)
    const crimeData = {}
    const airQualityData = {}
    const weights = data.data.weights

    let apiPromises: { [key in WeightKeys]?: Promise<any> } = {}

    // Add API call promises based on weights
    const addApiCall = (weightKey: WeightKeys, apiCall: (data: any) => Promise<any>, parsedData: any) => {
      if (weights[weightKey] && weights[weightKey]! > 0) {
        apiPromises[weightKey] = apiCall(parsedData)
      }
    }

    addApiCall('jobOpportunityWeight', this.getIndustryResponse.bind(this), jobData)
    addApiCall('weatherWeight', this.getWeatherResponse.bind(this), weatherData)
    addApiCall('recreationalActivitiesWeight', this.getRecreationResponse.bind(this), recreationData)
    addApiCall('publicServicesWeight', this.getPublicServicesResponse.bind(this), publicServicesData)
    addApiCall('crimeRateWeight', this.getCrimeResponse.bind(this), crimeData)
    addApiCall('sceneryWeight', this.getSceneryResponse.bind(this), sceneryData)
    addApiCall('airQualityWeight', this.getAirQualityResponse.bind(this), airQualityData)
    addApiCall('costOfLivingWeight', this.getHousingResponse.bind(this), housingData)

    try {
      let responses = await Promise.allSettled(Object.values(apiPromises))
      let processedResponses: { [key: string]: any } = {}
      Object.keys(apiPromises).forEach((key, index) => {
        const responseKey = key.replace('Weight', 'Response')
        const result = responses[index]
        if (result.status === 'fulfilled') {
          processedResponses[responseKey] = result.value
        } else {
          processedResponses[responseKey] = null
        }
      })

      const topTen = await this.scoreCities(
        processedResponses.jobOpportunityResponse,
        processedResponses.weatherResponse,
        processedResponses.recreationalActivitiesResponse,
        processedResponses.publicServicesResponse,
        processedResponses.crimeRateResponse,
        processedResponses.sceneryResponse,
        processedResponses.airQualityResponse,
        processedResponses.costOfLivingResponse,
        weights,
        recreationData,
        jobData
      )

      return {
        topTen
      }
    } catch (error) {
      console.error('Error processing requests:', error)
      throw new Error('Unable to process requests.')
    }
  }

  parseJobData(data: SurveyData): any {
    const { minSalary, jobLevel, selectedJobs } = data.data

    return {
      minSalary,
      jobLevel,
      selectedJobs
    }
  }

  parseWeatherData(data: SurveyData): any {
    const { temperatureData, snowPreference, rainPreference } = data.data

    return {
      temperatureData,
      snowPreference,
      rainPreference
    }
  }

  parseHousingData(data: SurveyData): any {
    const { housingType, homeMin, homeMax, rentMin, rentMax } = data.data

    return {
      housingType,
      homeMin,
      homeMax,
      rentMin,
      rentMax
    }
  }

  parsePublicServicesData(data: SurveyData): any {
    const { searchRadius, publicServices } = data.data

    return {
      searchRadius,
      publicServices
    }
  }

  parseSceneryData(data: SurveyData): any {
    const { searchRadius, scenery } = data.data

    return {
      searchRadius,
      scenery
    }
  }

  parseRecreationData(data: SurveyData): any {
    const { recreationalInterests, searchRadius } = data.data

    return {
      recreationalInterests,
      searchRadius
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
          ...data
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

  scoreCities(
    job: any,
    weather: any,
    recreation: any,
    publicServices: any,
    crime: any,
    scenery: any,
    airQuality: any,
    housing: any,
    weights: any,
    recreationFormData: any,
    jobFormData: any
  ): any {
    const cityScores = new Map<number, number>()

    const categories = [
      { data: job?.topCities, weight: weights.jobOpportunityWeight },
      { data: weather, weight: weights.weatherWeight },
      { data: recreation, weight: weights.recreationalActivitiesWeight },
      { data: housing, weight: weights.costOfLivingWeight },
      { data: publicServices, weight: weights.publicServicesWeight },
      { data: scenery, weight: weights.sceneryWeight },
      { data: airQuality, weight: weights.airQualityWeight },
      { data: crime, weight: weights.crimeRateWeight }
    ]

    categories.forEach((category) => {
      category.data?.forEach((city: any) => {
        if (!city?.ranking) {
          return
        }
        const normalizedScore = 301 - city?.ranking
        const weightedScore = normalizedScore * (category.weight || 0)
        cityScores.set(city.city_id, (cityScores.get(city.city_id) || 0) + weightedScore)
      })
    })

    const sortedCities = Array.from(cityScores)
      .map(([city_id, score]) => ({ city_id, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    // Get detailed information for the top cities
    const citiesWithDetails = this.getCityDetails(sortedCities, recreationFormData, jobFormData)

    return citiesWithDetails
  }

  async getCityDetails(cities: any, recreation: any, job: any): Promise<any> {
    let { recreationalInterests, searchRadius } = recreation
    if (typeof recreationalInterests === 'string') {
      recreationalInterests = [recreationalInterests]
    }
    const { selectedJobs } = job

    // Get the raw city details
    const cityDetailsRaw = await this.sequelize.models.City.findAll({
      where: {
        city_id: cities.map((city: any) => city.city_id)
      },
      include: [
        {
          model: this.sequelize.models.CrimeStatsCity
        },
        {
          model: this.sequelize.models.CityDemographics
        },
        {
          model: this.sequelize.models.CityMonthlyWeatherCounty
        },
        {
          model: this.sequelize.models.HomePrice,
          attributes: years
        },
        {
          model: this.sequelize.models.MonthlyRentCities,
          attributes: years
        },
        {
          model: this.sequelize.models.Area,
          attributes: ['area_title'],
          include: [{ model: this.sequelize.models.State }, { model: this.sequelize.models.AirQuality }]
        },
        {
          model: this.sequelize.models.County,
          attributes: ['county_name']
        }
      ]
    })

    const areaCodes = cityDetailsRaw.map((cityDetail: any) => cityDetail.area_code)

    const jobData = await this.sequelize.models.CityIndustrySalary.findAll({
      where: {
        area_code: { [Op.in]: areaCodes },
        occ_code: { [Op.in]: selectedJobs.map((job: any) => job.occ_code) }
      }
    })

    const jobDataByCity = jobData.reduce((acc: { [key: number]: any }, job: any) => {
      if (!acc[job.area_code]) {
        acc[job.area_code] = []
      }
      acc[job.area_code].push(job)
      return acc
    }, {})

    const landmarkTypes = (
      Array.isArray(recreationalInterests) ? recreationalInterests : [recreationalInterests]
    ).flatMap((interest: any) => RecreationalInterestMappings[interest as RecreationalInterestKeys])

    const landmarks = await this.sequelize.models.LandMarks.findAll({
      where: { Type: landmarkTypes }
    })

    const cityDetailsPromises = cityDetailsRaw.map(async (city: any) => {
      const { Latitude: cityLatitude, Longitude: cityLongitude } = city

      const landmarkPromises = landmarks.map(async (landmark: any) => {
        const distance = await calculateDistance(
          cityLatitude,
          cityLongitude,
          landmark.Latitude,
          landmark.Longitude
        )
        return distance <= searchRadius ? landmark : null
      })

      const cityJobs = jobDataByCity[city.area_code] || []

      const nearbyLandmarks = (await Promise.all(landmarkPromises)).filter((l) => l !== null)

      return {
        score: cities.find((c: any) => c.city_id === city.city_id)?.score,
        city_id: city.city_id,
        city_name: city.city_name,
        county_name: city.County?.county_name,
        state_name: city.Area?.State.state,
        latitude: cityLatitude,
        longitude: cityLongitude,
        Population: {
          pop_2020: city.pop_2020,
          pop_2021: city.pop_2021,
          pop_2022: city.pop_2022
        },
        AirQuality: city.Area?.AirQuality,
        CityDemographics: city.CityDemographic,
        PublicServices: city.PublicServiceCache,
        Crime: city.CrimeStatsCity,
        HomePrice: city.HomePrices,
        MonthlyRent: city.MonthlyRentCities,
        Jobs: cityJobs,
        Weather: city.CityMonthlyWeatherCounties,
        Recreation: nearbyLandmarks.map((landmark: any) => ({
          Location: landmark.Location,
          Type: landmark.Type,
          Latitude: landmark.Latitude,
          Longitude: landmark.Longitude
        }))
      }
    })

    const cityDetails = await Promise.all(cityDetailsPromises)

    const sortedCities = cityDetails.sort((a, b) => b.score - a.score)

    return sortedCities
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

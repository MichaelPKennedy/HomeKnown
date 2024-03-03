import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { SurveyData, SurveyPatch, WeightKeys, RecreationalInterestKeys } from './survey.schema'
import { surveyDataValidator, RecreationalInterestMappings } from './survey.schema'
import { Op } from 'sequelize'
import { calculateDistance } from '../../utils'
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 })

export type { SurveyData, SurveyPatch }

interface QueryParams {
  query: string
}
export interface SurveyParams extends Params {
  query?: QueryParams
}

export interface FindParams extends Params {
  query: {
    user_id: number
    filter: string
  }
}

const years: string[] = []
for (let year = 2019; year <= 2023; year++) {
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
    const crimeData = this.parseCrimeData(data)
    const airQualityData = this.parseAirQualityData(data)
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
    const { minSalary1, minSalary2, jobLevel, selectedJobs, minPopulation, maxPopulation, includedStates } =
      data.data

    return {
      minSalary1,
      minSalary2,
      jobLevel,
      selectedJobs,
      minPopulation,
      maxPopulation,
      includedStates
    }
  }

  parseWeatherData(data: SurveyData): any {
    const {
      temperatureData,
      snowPreference,
      rainPreference,
      minPopulation,
      maxPopulation,
      includedStates,
      humidityPreference
    } = data.data

    return {
      temperatureData,
      snowPreference,
      rainPreference,
      minPopulation,
      maxPopulation,
      includedStates,
      humidityPreference
    }
  }

  parseHousingData(data: SurveyData): any {
    const { housingType, homeMin, homeMax, rentMin, rentMax, minPopulation, maxPopulation, includedStates } =
      data.data

    return {
      housingType,
      homeMin,
      homeMax,
      rentMin,
      rentMax,
      minPopulation,
      maxPopulation,
      includedStates
    }
  }

  parsePublicServicesData(data: SurveyData): any {
    const { searchRadius, publicServices, minPopulation, maxPopulation, includedStates } = data.data

    return {
      searchRadius,
      publicServices,
      minPopulation,
      maxPopulation,
      includedStates
    }
  }

  parseSceneryData(data: SurveyData): any {
    const { searchRadius, scenery, minPopulation, maxPopulation, includedStates } = data.data

    return {
      searchRadius,
      scenery,
      minPopulation,
      maxPopulation,
      includedStates
    }
  }

  parseCrimeData(data: SurveyData): any {
    const { minPopulation, maxPopulation, includedStates } = data.data

    return {
      minPopulation,
      maxPopulation,
      includedStates
    }
  }

  parseAirQualityData(data: SurveyData): any {
    const { minPopulation, maxPopulation, includedStates } = data.data

    return {
      minPopulation,
      maxPopulation,
      includedStates
    }
  }

  parseRecreationData(data: SurveyData): any {
    const { recreationalInterests, searchRadius, minPopulation, maxPopulation, includedStates } = data.data

    return {
      recreationalInterests,
      searchRadius,
      minPopulation,
      maxPopulation,
      includedStates
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
    const { publicServices, searchRadius, minPopulation, maxPopulation, includedStates } = data
    try {
      const response = await publicServicesService.find({
        query: {
          publicServices,
          searchRadius,
          minPopulation,
          maxPopulation,
          includedStates
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
    const { scenery, searchRadius, minPopulation, maxPopulation, includedStates } = data
    try {
      const response = await sceneryService.find({
        query: {
          scenery,
          searchRadius,
          minPopulation,
          maxPopulation,
          includedStates
        }
      })
      return response
    } catch (error) {
      console.error('Error querying the scenery service:', error)
      throw new Error('Unable to fetch data from scenery service.')
    }
  }

  async getAirQualityResponse(data: any): Promise<any> {
    const airQualityService = this.app.service('air-quality')
    const { minPopulation, maxPopulation, includedStates } = data
    try {
      const response = await airQualityService.find({
        query: { minPopulation, maxPopulation, includedStates }
      })
      return response
    } catch (error) {
      console.error('Error querying the air quality service:', error)
      throw new Error('Unable to fetch data from air quality service.')
    }
  }

  async getCrimeResponse(data: any): Promise<any> {
    const crimeService = this.app.service('crime')
    const { minPopulation, maxPopulation, includedStates } = data
    try {
      const response = await crimeService.find({
        query: { minPopulation, maxPopulation, includedStates }
      })
      return response
    } catch (error) {
      console.error('Error querying the crime service:', error)
      throw new Error('Unable to fetch data from crime service.')
    }
  }

  async scoreCities(
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
  ): Promise<any> {
    const cityScores = new Map<number, any>()
    const highestScoredCityPerCounty = new Map<string, any>()

    const categories = [
      { data: job?.topCities, weight: weights.jobOpportunityWeight, name: 'jobs' },
      { data: weather, weight: weights.weatherWeight, name: 'weather' },
      { data: recreation, weight: weights.recreationalActivitiesWeight, name: 'recreation' },
      { data: housing, weight: weights.costOfLivingWeight, name: 'housing' },
      { data: publicServices, weight: weights.publicServicesWeight, name: 'publicServices' },
      { data: scenery, weight: weights.sceneryWeight, name: 'scenery' },
      { data: airQuality, weight: weights.airQualityWeight, name: 'airQuality' },
      { data: crime, weight: weights.crimeRateWeight, name: 'crime' }
    ]

    categories.forEach((category) => {
      category.data?.forEach((city: any) => {
        if (!city?.ranking) {
          return
        }
        const normalizedScore = 10001 - city.ranking
        const weightedScore = normalizedScore * (category.weight || 0)
        let cityData = cityScores.get(city.city_id) || { city_id: city.city_id, score: 0, categories: [] }
        cityData.score += weightedScore
        if (!cityData.categories.includes(category.name)) {
          cityData.categories.push(category.name)
        }
        cityScores.set(city.city_id, cityData)

        // Updating the highest scored city per county
        const county = city.county || city.county_fips || '999'
        let currentHighest = highestScoredCityPerCounty.get(county)
        if (!currentHighest || cityData.score > currentHighest.score) {
          highestScoredCityPerCounty.set(county, {
            city_id: city.city_id,
            score: cityData.score,
            categories: cityData.categories
          })
        }
      })
    })

    const resultsByCounty = Array.from(highestScoredCityPerCounty.values())
    let finalCities = resultsByCounty.length > 10 ? resultsByCounty : Array.from(cityScores.values())

    finalCities.sort((a, b) => {
      const categoriesA = a.categories.length
      const categoriesB = b.categories.length
      if (categoriesA === categoriesB) {
        return b.score - a.score
      }
      return categoriesB - categoriesA
    })

    finalCities = finalCities.slice(0, 10)

    let citiesWithDetails = await this.getCityDetails(finalCities, recreationFormData, jobFormData)

    // ensure cities are still correctly ordered after processing
    citiesWithDetails = finalCities.map(({ city_id }) =>
      citiesWithDetails.find((city: any) => {
        return city.city_id === Number(city_id)
      })
    )
    return citiesWithDetails
  }

  async getCityDetails(cities: any, recreation?: any, job?: any): Promise<any> {
    let searchRadius = 50
    let selectedJobs = [] as any[]
    let landmarkTypes = [] as string[]

    if (recreation) {
      const { recreationalInterests } = recreation
      searchRadius = recreation.searchRadius || searchRadius
      landmarkTypes = (
        Array.isArray(recreationalInterests) ? recreationalInterests : [recreationalInterests]
      ).flatMap((interest) => RecreationalInterestMappings[interest as RecreationalInterestKeys])
    }

    if (job) {
      selectedJobs = job.selectedJobs || []
    }

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
          model: this.sequelize.models.CityMonthlyWeather
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
          model: this.sequelize.models.State,
          attributes: ['state']
        },
        {
          model: this.sequelize.models.Area,
          attributes: ['area_title'],
          include: [{ model: this.sequelize.models.AirQuality }]
        },
        {
          model: this.sequelize.models.County,
          attributes: ['county_name']
        }
      ]
    })

    let jobData = [] as any[]
    if (selectedJobs.length > 0) {
      const areaCodes = cityDetailsRaw.map((cityDetail: any) => cityDetail.area_code)
      jobData = await this.sequelize.models.CityIndustrySalary.findAll({
        where: {
          area_code: { [Op.in]: areaCodes },
          occ_code: { [Op.in]: selectedJobs.map((job: any) => job.occ_code) }
        },
        include: [
          {
            model: this.sequelize.models.Occupation,
            attributes: ['occ_title']
          }
        ]
      })
    }

    const cityDetailsPromises = cityDetailsRaw.map(async (city: any) => {
      const { Latitude: cityLatitude, Longitude: cityLongitude } = city
      const cityJobs = jobData.filter((job) => job.area_code === city.area_code)

      return {
        city_id: city.city_id,
        city_name: city.city_name,
        county_name: city.County?.county_name,
        state_name: city.State?.state,
        latitude: cityLatitude,
        longitude: cityLongitude,
        Population: {
          pop_2020: city.pop_2020,
          pop_2021: city.pop_2021,
          pop_2022: city.pop_2022
        },
        elevation: city.elevation,
        metroArea: city.Area?.area_title,
        description: city.city_description,
        AirQuality: city.Area?.AirQuality,
        CityDemographics: city.CityDemographic,
        PublicServices: city.PublicServiceCache,
        Crime: city.CrimeStatsCity,
        HomePrice: city.HomePrices,
        MonthlyRent: city.MonthlyRentCities,
        Jobs: cityJobs,
        selectedJobs,
        Weather: city.CityMonthlyWeathers
      }
    })

    const cityDetails = await Promise.all(cityDetailsPromises)

    return cityDetails
  }

  async find(params: FindParams): Promise<any> {
    const { user_id } = params.query
    const cacheKey = `cityDetails_${user_id}`
    const cachedData = myCache.get(cacheKey)

    if (cachedData) {
      return cachedData
    }

    const userCitiesService = this.app.service('user-cities')
    const userCities = await userCitiesService.find({
      query: {
        user_id: user_id.toString()
      }
    })
    const cities = userCities.data.map((city: any) => {
      return { city_id: city }
    })
    const cityDetails = await this.getCityDetails(cities)

    myCache.set(cacheKey, cityDetails)

    return cityDetails
  }

  async get(id: Id, params?: SurveyParams): Promise<any> {
    try {
      const cacheKey = `cityDetails_${id}`
      const cachedData = myCache.get(cacheKey)

      if (cachedData) {
        return cachedData
      }

      const cityDetails = await this.getCityDetails([{ city_id: id }])

      if (!cityDetails || cityDetails.length === 0) {
        throw new Error('City not found')
      }

      myCache.set(cacheKey, cityDetails)

      return cityDetails
    } catch (error) {
      console.error('Error fetching city details:', error)
      throw new Error('Error fetching city details')
    }
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

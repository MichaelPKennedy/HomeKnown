import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Survey, SurveyData, SurveyPatch, SurveyQuery } from './survey.schema'
import { Op } from 'sequelize'

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
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
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
    weights: any,
    recreationFormData: any,
    jobFormData: any
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

    const citiesWithDetails = this.getCityDetails(sortedByCount.slice(0, 10), recreationFormData, jobFormData)

    return citiesWithDetails
  }

  async create(data: SurveyFormData, params?: SurveyParams): Promise<any> {
    console.log('data', data)
    const jobData = this.parseJobData(data)
    const weatherData = this.parseWeatherData(data)
    const recreationData = this.parseRecreationData(data)
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

      const topTen = await this.scoreCities(
        jobResponse,
        weatherResponse,
        recreationResponse,
        housingResponse,
        publicServicesResponse,
        sceneryResponse,
        airQualityResponse,
        crimeResponse,
        weights,
        recreationData,
        jobData
      )
      console.log('topTen', topTen)

      return {
        topTen
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

  parseRecreationData(data: SurveyFormData): any {
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
          model: this.sequelize.models.HomePrice
        },
        {
          model: this.sequelize.models.MonthlyRentCities
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

    const landmarks = await this.sequelize.models.LandMarks.findAll({
      where: {
        Type: {
          [Op.in]: recreationalInterests
        }
      }
    })

    const cityDetailsPromises = cityDetailsRaw.map(async (city: any) => {
      const { Latitude: cityLatitude, Longitude: cityLongitude } = city

      const landmarkPromises = landmarks.map(async (landmark: any) => {
        const distance = await this.calculateDistance(
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
        city_id: city.city_id,
        city_name: city.city_name,
        county_name: city.County.county_name,
        state_name: city.Area.State.state,
        latitude: cityLatitude,
        longitude: cityLongitude,
        Population: {
          pop_2020: city.pop_2020,
          pop_2021: city.pop_2021,
          pop_2022: city.pop_2022
        },
        AirQuality: city.Area.AirQuality,
        CityDemographics: city.CityDemographic,
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

    return cityDetails
  }

  async calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number> {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in kilometers
    return d * 0.621371 // Convert to miles
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

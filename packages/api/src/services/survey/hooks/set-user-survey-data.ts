import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { SurveyService } from '../survey.class'

interface RecInterestsMapping {
  [key: string]: string
}

interface Categories {
  foodAndDrinks: boolean
  beaches: boolean
  nature: boolean
  adventureAndSports: boolean
  historyAndCulture: boolean
  winterSports: boolean
  entertainment: boolean
  wellness: boolean
}

interface Regions {
  Northeast: number[]
  Midwest: number[]
  South: number[]
  West: number[]
}

interface RegionBooleans {
  northeast: boolean
  midwest: boolean
  south: boolean
  west: boolean
}

interface TemperatureData {
  month: string
  temp: number
}

const recInterestMapping = {
  restaurants: 'foodAndDrinks',
  beaches: 'beaches',
  lakes: 'nature',
  bars: 'foodAndDrinks',
  mountains: 'nature',
  hikingTrails: 'adventureAndSports',
  caves: 'adventureAndSports',
  monuments: 'historyAndCulture',
  historicSites: 'historyAndCulture',
  museums: 'historyAndCulture',
  waterfalls: 'nature',
  forests: 'nature',
  skiResorts: 'winterSports',
  nationalParks: 'nature',
  botanicalGardens: 'nature',
  rivers: 'nature',
  indoorSportsCentres: 'adventureAndSports',
  indoorSwimmingFacilities: 'adventureAndSports',
  indoorClimbingCentres: 'adventureAndSports',
  outdoorTennisCentres: 'adventureAndSports',
  crossCountrySkiAreas: 'winterSports',
  outdoorRockClimbing: 'adventureAndSports',
  zoos: 'nature',
  wildlifeReserves: 'nature',
  artGalleries: 'historyAndCulture',
  aquariums: 'entertainment',
  parks: 'nature',
  bicycleTrails: 'adventureAndSports',
  musicVenues: 'entertainment',
  farmersMarkets: 'entertainment',
  golfCourses: 'adventureAndSports',
  spasAndWellnessCenters: 'wellness',
  vineyards: 'entertainment',
  hotAirBalloonRides: 'adventureAndSports',
  artStudios: 'historyAndCulture',
  yogaStudios: 'wellness',
  fitnessGyms: 'wellness',
  danceStudios: 'wellness',
  racecourses: 'adventureAndSports',
  indoorSwimmingPoolFacilities: 'adventureAndSports',
  shoppingCenters: 'entertainment',
  amusementParks: 'entertainment',
  telescopeObservatories: 'nature',
  planetariums: 'nature',
  nightclubs: 'entertainment'
} as RecInterestsMapping

const regionsMapping = {
  Northeast: [9, 23, 25, 33, 44, 50, 34, 36, 42],
  Midwest: [17, 18, 26, 39, 55, 19, 20, 27, 29, 31, 38, 46],
  South: [10, 12, 13, 24, 37, 45, 51, 54, 11, 1, 21, 28, 47, 5, 22, 40, 48],
  West: [4, 8, 16, 30, 32, 35, 49, 56, 2, 6, 15, 41, 53]
} as Regions

function calculateTemperatureVariance(temperatureData: TemperatureData[]) {
  if (!temperatureData.length) return 0

  const maxTemp = Math.max(...temperatureData.map((td) => td.temp))
  const minTemp = Math.min(...temperatureData.map((td) => td.temp))

  return maxTemp - minTemp
}

const setUserSurveyData: Hook<Application, SurveyService> = async (
  context: HookContext<Application, SurveyService>
): Promise<HookContext<Application, SurveyService>> => {
  const { data } = context
  const { user_id, data: surveyData } = data
  const { recreationalInterests, includedStates, temperatureData, weights, selectedJobs } = surveyData

  const categories = {
    foodAndDrinks: false,
    beaches: false,
    nature: false,
    adventureAndSports: false,
    historyAndCulture: false,
    winterSports: false,
    entertainment: false,
    wellness: false
  } as Categories

  // Set category flags based on recreational interests
  recreationalInterests.forEach((interest: string) => {
    const category = recInterestMapping[interest] as keyof Categories
    if (category) {
      categories[category] = true
    }
  })

  const regionBooleans = {
    northeast: false,
    midwest: false,
    south: false,
    west: false
  } as RegionBooleans

  Object.entries(regionsMapping).forEach(([region, stateCodes]) => {
    const regionKey = region.toLowerCase() as keyof RegionBooleans
    if (includedStates.length === 0) return (regionBooleans[regionKey] = true)
    regionBooleans[regionKey] = stateCodes.some((code: number) => includedStates.includes(code))
  })

  const transformedData = {
    ...regionBooleans,
    user_id: user_id,
    costOfLivingWeight: weights.costOfLivingWeight || 0,
    recreationWeight: weights.recreationalActivitiesWeight || 0,
    weatherWeight: weights.weatherWeight || 0,
    sceneryWeight: weights.sceneryWeight || 0,
    industryWeight: weights.jobOpportunityWeight || 0,
    publicServicesWeight: weights.publicServicesWeight || 0,
    crimeWeight: weights.crimeRateWeight || 0,
    airQualityWeight: weights.airQualityWeight || 0,
    job1: selectedJobs.length > 0 ? selectedJobs[0].occ_code : null,
    job1Salary: surveyData.minSalary1 ? parseFloat(surveyData.minSalary1) : null,
    job2: selectedJobs.length > 1 ? surveyData.selectedJobs[1].occ_code : null,
    job2Salary: surveyData.minSalary2 ? parseFloat(surveyData.minSalary2) : null,
    entertainment: categories.entertainment,
    foodAndDrinks: categories.foodAndDrinks,
    historyAndCulture: categories.historyAndCulture,
    beaches: categories.beaches,
    nature: categories.nature,
    winterSports: categories.winterSports,
    adventureAndSports: categories.adventureAndSports,
    wellness: categories.wellness,
    yearly_avg_temp_norm:
      temperatureData.reduce((acc: number, cur: any) => acc + cur.temp, 0) / temperatureData.length,
    temp_variance_norm: calculateTemperatureVariance(temperatureData),
    max_temp: Math.max(...temperatureData.map((td: TemperatureData) => td.temp)),
    min_temp: Math.min(...temperatureData.map((td: TemperatureData) => td.temp)),
    precipitation: surveyData.precipitation === 'regular',
    snow: surveyData.snowPreference === 'regular' || surveyData.snowPreference === 'heavy',
    pop_min: surveyData.minPopulation === -1 ? 0 : surveyData.minPopulation,
    pop_max: surveyData.maxPopulation === -1 ? 10000000 : surveyData.maxPopulation,
    homeMin: surveyData.homeMin,
    homeMax: surveyData.homeMax,
    rentMin: surveyData.rentMin,
    rentMax: surveyData.rentMax
  }

  try {
    const sequelizeClient = context.app.get('sequelizeClient' as any)
    const userSurveysModel = sequelizeClient.model('UserSurveys')

    await userSurveysModel.create(transformedData)
  } catch (error) {
    console.error('Error inserting UserSurvey data:', error)
  }

  return context
}

export default setUserSurveyData

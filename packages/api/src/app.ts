require('dotenv').config()
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import { Sequelize } from 'sequelize'
const session = require('express-session')
const oauth = require('@feathersjs/authentication-oauth')

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { authentication } from './authentication'
import { services } from './services/index'
import { channels } from './channels'
import { OccupationModel } from './models/occupation.model'
import { StateIndustrySalaryModel } from './models/state-industry-salary.model'
import { StateModel } from './models/state.model'
import { CityIndustrySalaryModel } from './models/city-industry-salary.model'
import { AreaModel } from './models/area.model'
import { WeatherModel } from './models/weather.model'
import { CityWeatherModel } from './models/city-weather.model'
import { LandMarksModel } from './models/landmarks.model'
import { CityModel } from './models/city.model'
import { CountyModel } from './models/county.model'
import { CrimeStatsModel } from './models/crime-stats.model'
import { MTFCCModel } from './models/MTFCC.model'
import { LandMarkModel } from './models/landmark.model'
import { CrimeStatsCityModel } from './models/crime-stats-city.model'
import { PublicServiceCacheModel } from './models/public-service-cache.model'
import { CityMonthlyWeatherCountyModel } from './models/city-monthly-weather-county.model'
import { CitySceneryCacheModel } from './models/city-scenery-cache.model'
import { AirQualityModel } from './models/air-quality.model'
import { CityDemographicsModel } from './models/city-demographics.model'
import { MonthlyRentCitiesModel } from './models/monthly-rent-cities.model'
import { HomePriceModel } from './models/home-price.model'
import { UsersModel } from './models/users.model'

const app: Application = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

const databaseConfig = require('../../config/databaseConfig.js')[process.env.NODE_ENV || 'development']
const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: databaseConfig.dialect
})

app.set('sequelizeClient' as any, sequelize)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

// Initialize your model with this instance
OccupationModel(sequelize)
StateIndustrySalaryModel(sequelize)
StateModel(sequelize)
CityIndustrySalaryModel(sequelize)
AreaModel(sequelize)
WeatherModel(sequelize)
CityWeatherModel(sequelize)
LandMarksModel(sequelize)
CityModel(sequelize)
CountyModel(sequelize)
CrimeStatsModel(sequelize)
MTFCCModel(sequelize)
LandMarkModel(sequelize)
CrimeStatsCityModel(sequelize)
PublicServiceCacheModel(sequelize)
CityMonthlyWeatherCountyModel(sequelize)
CitySceneryCacheModel(sequelize)
AirQualityModel(sequelize)
CityDemographicsModel(sequelize)
MonthlyRentCitiesModel(sequelize)
HomePriceModel(sequelize)
UsersModel(sequelize)

const City = sequelize.models.City
const Area = sequelize.models.Area
const County = sequelize.models.County
const State = sequelize.models.State
const PublicServiceCache = sequelize.models.PublicServiceCache
const CitySceneryCache = sequelize.models.CitySceneryCache
const CrimeStatsCity = sequelize.models.CrimeStatsCity
const CrimeStats = sequelize.models.CrimeStats
const CityDemographics = sequelize.models.CityDemographics
const CityMonthlyWeatherCounty = sequelize.models.CityMonthlyWeatherCounty
const CityIndustrySalary = sequelize.models.CityIndustrySalary
const HomePrice = sequelize.models.HomePrice
const MonthlyRentCities = sequelize.models.MonthlyRentCities
const AirQuality = sequelize.models.AirQuality
const Occupation = sequelize.models.Occupation
const LandMark = sequelize.models.LandMark
const MTFCC = sequelize.models.MTFCC
const StateIndustrySalary = sequelize.models.StateIndustrySalary
const Weather = sequelize.models.Weather

//database relationships
Area.hasOne(AirQuality, { foreignKey: 'area_code' })
Area.hasMany(CityIndustrySalary, { foreignKey: 'area_code' })
CityIndustrySalary.belongsTo(Area, { foreignKey: 'area_code' })
Area.belongsTo(State, { foreignKey: 'state_code' })
AirQuality.belongsTo(Area, { foreignKey: 'area_code' })
Area.hasMany(City, { foreignKey: 'area_code' })
County.hasMany(City, { foreignKey: 'county_fips' })
City.belongsTo(Area, { foreignKey: 'area_code' })
City.belongsTo(County, { foreignKey: 'county_fips' })
City.hasOne(PublicServiceCache, { foreignKey: 'city_id' })
City.hasOne(CitySceneryCache, { foreignKey: 'city_id' })
City.hasOne(CrimeStatsCity, { foreignKey: 'city_id' })
City.hasOne(CityDemographics, { foreignKey: 'city_id' })
City.hasMany(CityMonthlyWeatherCounty, { foreignKey: 'city_id' })
City.hasMany(HomePrice, { foreignKey: 'city_id' })
City.hasMany(MonthlyRentCities, { foreignKey: 'city_id' })
City.belongsTo(Area, { foreignKey: 'area_code' })
CitySceneryCache.belongsTo(City, { foreignKey: 'city_id' })
CityDemographics.belongsTo(City, { foreignKey: 'city_id' })
CityMonthlyWeatherCounty.belongsTo(City, { foreignKey: 'city_id' })
Occupation.hasMany(CityIndustrySalary, { foreignKey: 'occ_code' })
CityIndustrySalary.belongsTo(Occupation, { foreignKey: 'occ_code' })
CrimeStatsCity.belongsTo(City, { foreignKey: 'city_id' })
CrimeStats.belongsTo(County, { foreignKey: 'stcofips' })
CrimeStats.belongsTo(State, { foreignKey: 'fips_st' })
County.belongsTo(State, { foreignKey: 'state_code' })
County.hasMany(City, { foreignKey: 'county_fips' })
HomePrice.belongsTo(City, { foreignKey: 'city_id' })
LandMark.belongsTo(MTFCC, { foreignKey: 'MTFCC', as: 'MTFCCAssociation' })
MTFCC.hasMany(LandMark, { foreignKey: 'MTFCC', as: 'LandMarks' })
MonthlyRentCities.belongsTo(City, { foreignKey: 'city_id' })
PublicServiceCache.belongsTo(City, { foreignKey: 'city_id' })
State.hasMany(StateIndustrySalary, { foreignKey: 'state_code' })
State.hasMany(Weather, { foreignKey: 'state_code' })
StateIndustrySalary.belongsTo(State, { foreignKey: 'state_code' })
Weather.belongsTo(State, { foreignKey: 'state_code' })

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(authentication)
app.configure(oauth())
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})

// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }

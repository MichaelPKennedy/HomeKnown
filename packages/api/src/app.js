"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const feathers_1 = require("@feathersjs/feathers");
const express_1 = __importStar(require("@feathersjs/express"));
const configuration_1 = __importDefault(require("@feathersjs/configuration"));
const socketio_1 = __importDefault(require("@feathersjs/socketio"));
const sequelize_1 = require("sequelize");
const configuration_2 = require("./configuration");
const logger_1 = require("./logger");
const log_error_1 = require("./hooks/log-error");
const index_1 = require("./services/index");
const channels_1 = require("./channels");
const occupation_model_1 = require("./models/occupation.model");
const state_industry_salary_model_1 = require("./models/state-industry-salary.model");
const state_model_1 = require("./models/state.model");
const city_industry_salary_model_1 = require("./models/city-industry-salary.model");
const area_model_1 = require("./models/area.model");
const weather_model_1 = require("./models/weather.model");
const city_weather_model_1 = require("./models/city-weather.model");
const landmarks_model_1 = require("./models/landmarks.model");
const city_model_1 = require("./models/city.model");
const county_model_1 = require("./models/county.model");
const crime_stats_model_1 = require("./models/crime-stats.model");
const MTFCC_model_1 = require("./models/MTFCC.model");
const landmark_model_1 = require("./models/landmark.model");
const crime_stats_city_model_1 = require("./models/crime-stats-city.model");
const public_service_cache_model_1 = require("./models/public-service-cache.model");
const city_monthly_weather_county_model_1 = require("./models/city-monthly-weather-county.model");
const city_scenery_cache_model_1 = require("./models/city-scenery-cache.model");
const air_quality_model_1 = require("./models/air-quality.model");
const city_demographics_model_1 = require("./models/city-demographics.model");
const monthly_rent_cities_model_1 = require("./models/monthly-rent-cities.model");
const home_price_model_1 = require("./models/home-price.model");
const app = (0, express_1.default)((0, feathers_1.feathers)());
exports.app = app;
// Load app configuration
app.configure((0, configuration_1.default)(configuration_2.configurationValidator));
app.use((0, express_1.cors)());
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
// Host the public folder
app.use('/', (0, express_1.serveStatic)(app.get('public')));
const databaseConfig = require('../config/databaseConfig.js')[process.env.NODE_ENV || 'development'];
console.log('databaseConfig', databaseConfig);
const sequelize = new sequelize_1.Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect
});
app.set('sequelizeClient', sequelize);
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
// Initialize your model with this instance
(0, occupation_model_1.OccupationModel)(sequelize);
(0, state_industry_salary_model_1.StateIndustrySalaryModel)(sequelize);
(0, state_model_1.StateModel)(sequelize);
(0, city_industry_salary_model_1.CityIndustrySalaryModel)(sequelize);
(0, area_model_1.AreaModel)(sequelize);
(0, weather_model_1.WeatherModel)(sequelize);
(0, city_weather_model_1.CityWeatherModel)(sequelize);
(0, landmarks_model_1.LandMarksModel)(sequelize);
(0, city_model_1.CityModel)(sequelize);
(0, county_model_1.CountyModel)(sequelize);
(0, crime_stats_model_1.CrimeStatsModel)(sequelize);
(0, MTFCC_model_1.MTFCCModel)(sequelize);
(0, landmark_model_1.LandMarkModel)(sequelize);
(0, crime_stats_city_model_1.CrimeStatsCityModel)(sequelize);
(0, public_service_cache_model_1.PublicServiceCacheModel)(sequelize);
(0, city_monthly_weather_county_model_1.CityMonthlyWeatherCountyModel)(sequelize);
(0, city_scenery_cache_model_1.CitySceneryCacheModel)(sequelize);
(0, air_quality_model_1.AirQualityModel)(sequelize);
(0, city_demographics_model_1.CityDemographicsModel)(sequelize);
(0, monthly_rent_cities_model_1.MonthlyRentCitiesModel)(sequelize);
(0, home_price_model_1.HomePriceModel)(sequelize);
const City = sequelize.models.City;
const Area = sequelize.models.Area;
const County = sequelize.models.County;
const PublicServiceCache = sequelize.models.PublicServiceCache;
const CitySceneryCache = sequelize.models.CitySceneryCache;
const CrimeStatsCity = sequelize.models.CrimeStatsCity;
const CityDemographics = sequelize.models.CityDemographics;
const CityMonthlyWeatherCounty = sequelize.models.CityMonthlyWeatherCounty;
const CityIndustrySalary = sequelize.models.CityIndustrySalary;
const HomePrice = sequelize.models.HomePrice;
const MonthlyRentCities = sequelize.models.MonthlyRentCities;
const AirQuality = sequelize.models.AirQuality;
const Occupation = sequelize.models.Occupation;
Area.hasOne(AirQuality, { foreignKey: 'area_code' });
Area.hasMany(City, { foreignKey: 'area_code' });
County.hasMany(City, { foreignKey: 'county_fips' });
City.belongsTo(Area, { foreignKey: 'area_code' });
City.belongsTo(County, { foreignKey: 'county_fips' });
City.hasOne(PublicServiceCache, { foreignKey: 'city_id' });
City.hasOne(CitySceneryCache, { foreignKey: 'city_id' });
City.hasOne(CrimeStatsCity, { foreignKey: 'city_id' });
City.hasOne(CityDemographics, { foreignKey: 'city_id' });
City.hasMany(CityMonthlyWeatherCounty, { foreignKey: 'city_id' });
City.hasMany(HomePrice, { foreignKey: 'city_id' });
City.hasMany(MonthlyRentCities, { foreignKey: 'city_id' });
CitySceneryCache.belongsTo(City, { foreignKey: 'city_id' });
Occupation.hasMany(CityIndustrySalary, { foreignKey: 'occ_code' });
CityIndustrySalary.belongsTo(Occupation, { foreignKey: 'occ_code' });
// Configure services and real-time functionality
app.configure((0, express_1.rest)());
app.configure((0, socketio_1.default)({
    cors: {
        origin: app.get('origins')
    }
}));
app.configure(index_1.services);
app.configure(channels_1.channels);
// Configure a middleware for 404s and the error handler
app.use((0, express_1.notFound)());
app.use((0, express_1.errorHandler)({ logger: logger_1.logger }));
// Register hooks that run on all service methods
app.hooks({
    around: {
        all: [log_error_1.logError]
    },
    before: {},
    after: {},
    error: {}
});
// Register application setup and teardown hooks here
app.hooks({
    setup: [],
    teardown: []
});
//# sourceMappingURL=app.js.map
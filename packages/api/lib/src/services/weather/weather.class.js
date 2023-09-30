"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const sequelize_1 = require("sequelize");
const city_weather_model_1 = require("../../../models/city-weather.model");
const weather_model_1 = require("../../../models/weather.model");
const state_model_1 = require("../../../models/state.model");
class WeatherService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    getColumnsByDetail(detail, prefix) {
        let columns = {
            high: `${prefix}_high`,
            low: `${prefix}_low`,
            prec: `${prefix}_prec`,
            snow: `${prefix}_snow`
        };
        // Can add more conditions based on detail if necessary
        return columns;
    }
    async find(params) {
        const { temperature, temperaturePreference, climatePreference, snowPreference, rainPreference, importantSeason, seasonPreferenceDetail } = params;
        // Step 1: Get top 10 states based on average temperature close to the user's preference
        let whereStateCondition = {};
        if (temperaturePreference === 'mild') {
            whereStateCondition.avgTemp = {
                [sequelize_1.Op.between]: [temperature - 5, temperature + 5] // Assuming 'mild' as ±5 of user's preferred temp
            };
        }
        else {
            whereStateCondition.avgTemp = temperature; // 'distinct' matches the exact temperature
        }
        const topStates = await weather_model_1.Weather.findAll({
            where: whereStateCondition,
            attributes: [
                'state_code',
                [this.sequelize.fn('AVG', this.sequelize.col('avgTemp')), 'avg_temperature']
            ],
            include: [
                {
                    model: state_model_1.State,
                    attributes: ['state']
                }
            ],
            order: [[this.sequelize.fn('ABS', this.sequelize.literal(`AVG(avgTemp) - ${temperature}`)), 'ASC']],
            group: ['state_code'],
            limit: 10
        });
        const topStateCodes = topStates.map((record) => record.getDataValue('state_code'));
        // Step 2: Fetch the top 20 cities based on user's specific preferences from those states
        let whereCityCondition = {
            state: { [sequelize_1.Op.in]: topStateCodes }
        };
        if (importantSeason && seasonPreferenceDetail) {
            const prefix = importantSeason.slice(0, 3).toLowerCase(); // 'jan', 'feb', etc.
            const { high, low, prec, snow } = this.getColumnsByDetail(seasonPreferenceDetail, prefix);
            whereCityCondition = {
                ...whereCityCondition,
                [high]: { [sequelize_1.Op.gte]: temperature },
                [low]: { [sequelize_1.Op.lte]: temperature }
            };
            if (snowPreference === 'none') {
                whereCityCondition[snow] = { [sequelize_1.Op.eq]: 0 };
            }
            else if (snowPreference === 'light') {
                whereCityCondition[snow] = { [sequelize_1.Op.between]: [0.1, 3] }; // example range
            }
            else {
                whereCityCondition[snow] = { [sequelize_1.Op.gt]: 3 }; // heavy snow
            }
            if (rainPreference === 'dry') {
                whereCityCondition[prec] = { [sequelize_1.Op.lte]: 0.5 }; // example dry condition
            }
            else {
                whereCityCondition[prec] = { [sequelize_1.Op.gt]: 0.5 }; // regular rain
            }
        }
        const topCities = await city_weather_model_1.CityWeather.findAll({
            where: whereCityCondition,
            include: [
                {
                    model: state_model_1.State,
                    attributes: [],
                    where: { state_code: { [sequelize_1.Op.in]: topStateCodes } }
                }
            ],
            limit: 20
        });
        return {
            topStates: topStates,
            topCities: topCities
        };
    }
    async get(id, params) {
        throw new Error('Method not implemented.');
    }
    async create(data, params) {
        throw new Error('Method not implemented.');
    }
    async update(id, data, params) {
        throw new Error('Method not implemented.');
    }
    async patch(id, data, params) {
        throw new Error('Method not implemented.');
    }
    async remove(id, params) {
        throw new Error('Method not implemented.');
    }
}
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.class.js.map
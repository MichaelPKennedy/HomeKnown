"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const city_weather_model_1 = require("../../models/city-weather.model");
const weather_model_1 = require("../../models/weather.model");
const state_model_1 = require("../../models/state.model");
var ConditionKey;
(function (ConditionKey) {
    ConditionKey[ConditionKey["RainQuery"] = 0] = "RainQuery";
    ConditionKey[ConditionKey["SnowQuery"] = 1] = "SnowQuery";
    ConditionKey[ConditionKey["TempQuery"] = 2] = "TempQuery";
})(ConditionKey || (ConditionKey = {}));
class WeatherService {
    constructor(app, sequelizeClient) {
        this.conditionsMap = new Map();
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    setCondition(key, value) {
        this.conditionsMap.set(key, value);
    }
    getAllConditions() {
        return Array.from(this.conditionsMap.values());
    }
    modifyQueryForRetry(whereCityCondition, retryCount, temperature, havingConditions, temperaturePreference) {
        switch (retryCount) {
            case 1:
                havingConditions.estimatedYearlyAvgTemp = { [Op.between]: [temperature - 10, temperature + 10] };
                console.log('retry 1');
                break;
            case 2:
                this.setCondition(ConditionKey.RainQuery, this.sequelize.literal('jan_prec + feb_prec + mar_prec + apr_prec + may_prec + jun_prec + jul_prec + aug_prec + sep_prec + oct_prec + nov_prec + dec_prec BETWEEN 0 AND 30'));
                if (temperaturePreference === 'distinct') {
                    havingConditions['seasonDifference'] = {
                        [Op.gte]: 35
                    };
                }
                console.log('retry 2');
                break;
            case 3:
                if (temperaturePreference === 'distinct') {
                    havingConditions['seasonDifference'] = {
                        [Op.gte]: 30
                    };
                }
                console.log('retry 3');
                break;
            // Add more conditions as needed.
        }
        return { whereCityCondition, havingConditions };
    }
    async queryForCities(whereCityCondition, havingConditions, attributesInclude) {
        return await city_weather_model_1.CityWeather.findAll({
            where: whereCityCondition,
            attributes: {
                include: attributesInclude
            },
            having: havingConditions,
            include: [
                {
                    model: state_model_1.State
                }
            ],
            limit: 20
        });
    }
    async find(params) {
        console.log('weather params', params);
        const queryData = params.query;
        if (!queryData) {
            throw new Error('No query data provided.');
        }
        const { temperature, temperaturePreference, snowPreference, rainPreference } = queryData;
        if (typeof temperature === 'undefined') {
            throw new Error('Temperature must be provided.');
        }
        // Clear conditionsMap for the new call
        this.conditionsMap.clear();
        // Step 1: Get the average temperature for all states
        const allStatesTemperature = await weather_model_1.Weather.findAll({
            attributes: [
                'state_code',
                [this.sequelize.fn('AVG', this.sequelize.col('avgTemp')), 'avg_temperature']
            ],
            include: [
                {
                    model: state_model_1.State,
                    attributes: ['state', 'state_code', 'state_abbrev']
                }
            ],
            group: ['Weather.state_code', 'State.state_code', 'State.state']
        });
        // Compute average temperature for the entire year for each city
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const monthlyAverages = months.map((month) => `((${month}_high + ${month}_low) / 2)`);
        const estimatedYearlyAvgTemp = `(${monthlyAverages.join(' + ')}) / 12`;
        const yearlyPrecipitation = months.map((month) => `${month}_prec`).join(' + ');
        const yearlySnow = months.map((month) => `${month}_snow`).join(' + ');
        const temperatureCondition = { [Op.between]: [temperature - 5, temperature + 5] };
        // Set snow condition
        if (snowPreference === 'none') {
            this.setCondition(ConditionKey.SnowQuery, this.sequelize.literal(`${yearlySnow} = 0`));
        }
        else if (snowPreference === 'light') {
            this.setCondition(ConditionKey.SnowQuery, this.sequelize.literal(`${yearlySnow} BETWEEN 0.1 AND 10`));
        }
        else {
            this.setCondition(ConditionKey.SnowQuery, this.sequelize.literal(`${yearlySnow} > 10`));
        }
        // Set rain condition
        const precipitationSumLiteral = 'jan_prec + feb_prec + mar_prec + apr_prec + may_prec + jun_prec + jul_prec + aug_prec + sep_prec + oct_prec + nov_prec + dec_prec';
        if (rainPreference === 'dry') {
            this.setCondition(ConditionKey.RainQuery, this.sequelize.literal(`${precipitationSumLiteral} <= 20`));
        }
        else {
            this.setCondition(ConditionKey.RainQuery, this.sequelize.literal(`${precipitationSumLiteral} > 5`));
        }
        const attributesInclude = [
            [this.sequelize.literal(estimatedYearlyAvgTemp), 'estimatedYearlyAvgTemp'],
            [this.sequelize.literal(yearlyPrecipitation), 'yearlyPrecipitation']
        ];
        // Define the initial conditions for the query
        let whereCityCondition = {
            area_code: { [Op.ne]: null }
        };
        let havingConditions = {
            estimatedYearlyAvgTemp: temperatureCondition
        };
        // Check if the user wants distinct seasons
        if (temperaturePreference === 'distinct') {
            const highestMonthlyAvg = `GREATEST(${months.map((month) => `${month}_high`).join(', ')})`;
            const lowestMonthlyAvg = `LEAST(${months.map((month) => `${month}_low`).join(', ')})`;
            attributesInclude.push([this.sequelize.literal(highestMonthlyAvg), 'highestMonthlyAvg'], [this.sequelize.literal(lowestMonthlyAvg), 'lowestMonthlyAvg']);
            const seasonDifferenceLiteral = `(${highestMonthlyAvg} - ${lowestMonthlyAvg})`;
            attributesInclude.push([this.sequelize.literal(seasonDifferenceLiteral), 'seasonDifference']);
            // Set the having condition for distinct seasons
            havingConditions['seasonDifference'] = {
                [Op.gte]: 40
            };
        }
        const MAX_RETRIES = 3;
        let retryCount = 0;
        // Apply the conditions to the whereCityCondition object
        whereCityCondition[Op.and] = this.getAllConditions();
        // Make the initial query
        let topCities = await this.queryForCities(whereCityCondition, havingConditions, attributesInclude);
        // Retry logic if the initial query returned no results
        while (topCities.length === 0 && retryCount < MAX_RETRIES) {
            retryCount++;
            console.log('WhereCityCondition', whereCityCondition);
            const modifiedConditions = this.modifyQueryForRetry(whereCityCondition, retryCount, temperature, havingConditions, temperaturePreference);
            whereCityCondition = modifiedConditions.whereCityCondition;
            havingConditions = modifiedConditions.havingConditions;
            // Reapply the conditions to the whereCityCondition object before making the query
            whereCityCondition[Op.and] = this.getAllConditions();
            // Make the retry query
            topCities = await this.queryForCities(whereCityCondition, havingConditions, attributesInclude);
        }
        const weatherDataForAllStates = await weather_model_1.Weather.findAll({
            attributes: ['state_code', 'month', 'avgTemp'],
            order: ['state_code', 'month']
        });
        // Convert the weather data into a format suitable for graphing
        const graphData = weatherDataForAllStates.reduce((acc, record) => {
            const stateCode = record.getDataValue('state_code');
            const month = record.getDataValue('month');
            const avgTemperature = record.getDataValue('avgTemp');
            if (!acc[stateCode]) {
                acc[stateCode] = { stateCode, monthlyAvg: {} };
            }
            acc[stateCode].monthlyAvg[month] = avgTemperature;
            return acc;
        }, {});
        return {
            allStatesTemp: allStatesTemperature,
            topCities: topCities,
            graphData: Object.values(graphData)
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
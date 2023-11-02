"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
class WeatherService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        const queryData = params.query;
        if (!queryData || !queryData.temperatureData) {
            throw new Error('Invalid query data provided.');
        }
        const { snowPreference, rainPreference, temperatureData } = queryData;
        const whereConditions = temperatureData.map((monthData) => {
            const whereCondition = {
                year: 2022,
                month: monthData.month
            };
            if (monthData.temp !== undefined) {
                whereCondition.avg_temp = {
                    [Op.between]: [monthData.temp - 2, monthData.temp + 2]
                };
            }
            return whereCondition;
        });
        try {
            const monthlyResults = await Promise.all(whereConditions.map(async (condition) => {
                return await this.sequelize.model('CityMonthlyWeatherCounty').findAll({
                    where: condition,
                    limit: 20
                });
            }));
            const flattenedResults = monthlyResults.flat();
            const scoredResults = await this.scoreResults(flattenedResults, temperatureData, snowPreference, rainPreference);
            const sortedResults = scoredResults.sort((a, b) => b.score - a.score);
            const topResults = sortedResults.slice(0, 10);
            return topResults;
        }
        catch (error) {
            console.error('Error querying weather data:', error);
            throw new Error('Error querying weather data');
        }
    }
    async scoreResults(results, temperatureData, snowPreference, rainPreference) {
        // Group by city and calculate total snow and rain for the year
        const groupedResults = results.reduce((acc, curr) => {
            if (!acc[curr.cityId]) {
                acc[curr.cityId] = { city: curr.city, snow: 0, rain: 0, monthlyData: [] };
            }
            acc[curr.cityId].snow += curr.snow;
            acc[curr.cityId].rain += curr.rain;
            acc[curr.cityId].monthlyData.push(curr);
            return acc;
        }, {});
        // Convert groupedResults to an array
        const citiesArray = Object.values(groupedResults);
        // Calculate score for each city based on temperature, snow, and rain preferences
        const scoredResults = citiesArray.map((city) => {
            let score = 0;
            // Score temperature preferences
            temperatureData.forEach((monthData) => {
                const monthResult = city.monthlyData.find((m) => m.month === monthData.month);
                if (monthResult && monthData.temp !== undefined) {
                    const tempDiff = Math.abs(monthResult.avg_temp - monthData.temp);
                    score += Math.max(0, 10 - tempDiff); // Subtracting the temperature difference from 10, so closer temperatures get higher scores
                }
            });
            // Score snow preferences
            if (snowPreference) {
                score += this.getSnowScore(city.snow, snowPreference);
            }
            // Score rain preferences
            if (rainPreference) {
                score += this.getRainScore(city.rain, rainPreference);
            }
            return { ...city, score };
        });
        return scoredResults;
    }
    // Add `getSnowScore` and `getRainScore` methods to calculate score based on snow and rain preferences
    getSnowScore(totalSnow, preference) {
        switch (preference) {
            case 'none':
                return totalSnow === 0 ? 10 : 0;
            case 'light':
                return totalSnow < 30 ? 10 : 0;
            case 'heavy':
                return totalSnow >= 30 ? 10 : 0;
            default:
                return 0;
        }
    }
    getRainScore(totalRain, preference) {
        switch (preference) {
            case 'dry':
                return totalRain < 50 ? 10 : 0;
            case 'regular':
                return totalRain >= 50 ? 10 : 0;
            default:
                return 0;
        }
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
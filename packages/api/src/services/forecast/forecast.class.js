"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastService = void 0;
const process = require('process');
class ForecastService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        if (!params.query) {
            throw new Error('Query parameters are missing!');
        }
        console.log('Params:', params);
        const { latitude, longitude } = params.query;
        console.log('latitude', latitude);
        console.log('process.env.WEATHER_API_KEY', process.env.WEATHER_API_KEY);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.WEATHER_API_KEY}`);
        console.log('response', response);
        //change response to Fahrenheit
        return response.json();
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
exports.ForecastService = ForecastService;
//# sourceMappingURL=forecast.class.js.map
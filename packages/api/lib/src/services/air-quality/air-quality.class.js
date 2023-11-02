"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirQualityService = void 0;
class AirQualityService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        const { sequelize } = this;
        // Calculate a score for each city based on air quality. Lower values for pollutants is better.
        const citiesRankedByAirQuality = await sequelize.models.AirQuality.findAll({
            attributes: [
                'area_code',
                'CO_8hr_ppm',
                'Pb_3mo_ug_m3',
                'NO2_AM_ppb',
                'NO2_1hr_ppb',
                'O3_8hr_ppm',
                'PM10_24hr_ug_m3',
                'PM2_5_Wtd_AM_ug_m3',
                'PM2_5_24hr_ug_m3',
                'SO2_1hr_ppb',
                [
                    sequelize.fn('SUM', sequelize.col('CO_8hr_ppm'), sequelize.col('Pb_3mo_ug_m3'), sequelize.col('NO2_AM_ppb'), sequelize.col('NO2_1hr_ppb'), sequelize.col('O3_8hr_ppm'), sequelize.col('PM10_24hr_ug_m3'), sequelize.col('PM2_5_Wtd_AM_ug_m3'), sequelize.col('PM2_5_24hr_ug_m3'), sequelize.col('SO2_1hr_ppb')),
                    'totalPollutantScore'
                ]
            ],
            order: [
                [sequelize.col('totalPollutantScore'), 'ASC'] // Ascending order for the best air quality first
            ],
            limit: 30
        });
        return citiesRankedByAirQuality;
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
exports.AirQualityService = AirQualityService;
//# sourceMappingURL=air-quality.class.js.map
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
                [
                    sequelize.literal(`
            COALESCE(CO_8hr_ppm, 0) +
            COALESCE(Pb_3mo_ug_m3, 0) +
            COALESCE(NO2_AM_ppb, 0) +
            COALESCE(NO2_1hr_ppb, 0) +
            COALESCE(O3_8hr_ppm, 0) +
            COALESCE(PM10_24hr_ug_m3, 0) +
            COALESCE(PM2_5_Wtd_AM_ug_m3, 0) +
            COALESCE(PM2_5_24hr_ug_m3, 0) +
            COALESCE(SO2_1hr_ppb, 0)
          `),
                    'totalPollutantScore'
                ]
            ],
            order: [[sequelize.literal('totalPollutantScore'), 'ASC']],
            limit: 300
        });
        // Map and rank the cities by their pollutant score
        let ranking = 1;
        let previousScore = 0;
        const citiesWithPollutantScoresAndRanking = citiesRankedByAirQuality.map((city, index) => {
            const totalPollutantScore = city.dataValues.totalPollutantScore;
            if (previousScore !== totalPollutantScore && previousScore !== null) {
                ranking = index + 1;
            }
            previousScore = totalPollutantScore;
            return {
                area_code: city.area_code,
                totalPollutantScore,
                ranking
            };
        });
        const areaCodes = citiesWithPollutantScoresAndRanking.map((c) => c.area_code);
        const cities = await sequelize.models.City.findAll({
            where: { area_code: areaCodes }
        });
        const rankedCitiesWithIds = citiesWithPollutantScoresAndRanking.map((cityScore) => {
            const cityData = cities.find((c) => c.area_code === cityScore.area_code);
            if (!cityData) {
                return null;
            }
            return {
                city_id: cityData.city_id,
                totalPollutantScore: cityScore.totalPollutantScore,
                ranking: cityScore.ranking
            };
        });
        rankedCitiesWithIds.filter((c) => c !== null);
        return rankedCitiesWithIds;
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
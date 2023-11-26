"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrimeService = void 0;
const sequelize_1 = require("sequelize");
class CrimeService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        try {
            const crimeRates = await this.sequelize.models.CrimeStatsCity.findAll({
                attributes: ['crime_score', 'city', 'state', 'city_id'],
                where: {
                    [sequelize_1.Op.and]: [{ crime_score: { [sequelize_1.Op.ne]: null } }, { city_id: { [sequelize_1.Op.ne]: null } }]
                },
                order: [['crime_score', 'ASC']],
                limit: 300
            });
            let ranking = 1; // Start ranking at 1
            let previousCrimeScore = crimeRates[0]?.dataValues?.crime_score;
            const rankedCrimeRates = crimeRates.map((crimeRate) => {
                if (crimeRate.dataValues.crime_score !== previousCrimeScore) {
                    ranking++;
                    previousCrimeScore = crimeRate.dataValues.crime_score;
                }
                return {
                    ranking,
                    city: crimeRate.dataValues.city,
                    city_id: crimeRate.dataValues.city_id,
                    state: crimeRate.dataValues.state,
                    crime_score: crimeRate.dataValues.crime_score
                };
            });
            return rankedCrimeRates;
        }
        catch (error) {
            console.error('Error fetching crime rates:', error);
            throw new Error('Error fetching crime rates');
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
exports.CrimeService = CrimeService;
//# sourceMappingURL=crime.class.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousingService = void 0;
const sequelize_1 = require("sequelize");
class HousingService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        const City = this.sequelize.models.City;
        const State = this.sequelize.models.State;
        const states = await State.findAll({
            attributes: ['state_code', 'totalCostIndex']
        });
        const totalCostIndices = states.reduce((acc, state) => {
            acc[state.state_code] = state.totalCostIndex;
            return acc;
        }, {});
        if (!params.query) {
            throw new Error('Query parameters are missing!');
        }
        const { min, max, housingType } = params.query;
        const priceType = housingType === 'rent' ? 'currentRentPrice' : 'currentHomePrice';
        const cities = await City.findAll({
            where: {
                [priceType]: {
                    [sequelize_1.Op.gte]: min,
                    [sequelize_1.Op.lte]: max
                }
            },
            attributes: ['city_name', 'area_code', priceType]
        });
        const rankedCities = cities
            .map((city) => {
            const totalCostIndex = totalCostIndices[city.area_code];
            return {
                ...city.get(),
                rank: city[priceType] + (totalCostIndex || 0)
            };
        })
            .sort((a, b) => a.rank - b.rank);
        return rankedCities;
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
exports.HousingService = HousingService;
//# sourceMappingURL=housing.class.js.map
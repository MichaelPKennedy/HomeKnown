"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneryService = void 0;
class SceneryService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        let sceneryArray = params.query?.scenery || [];
        const radius = Number(params.query?.searchRadius) || 10;
        const validSceneryOptions = ['forests', 'lakes_rivers', 'mountains', 'beaches'];
        const validRadiusOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
        if (typeof sceneryArray === 'string') {
            sceneryArray = [sceneryArray];
        }
        // Validate scenery options
        const validSceneryArray = sceneryArray.filter((s) => validSceneryOptions.includes(s));
        if (validSceneryArray.length === 0) {
            throw new Error('Invalid scenery options.');
        }
        // Validate search radius
        if (!validRadiusOptions.includes(radius)) {
            throw new Error('Invalid search radius. Please choose from [10, 15, 20, 25, 30, 35, 40, 45, 50].');
        }
        // Fetch all cities along with their scenery counts from cache
        const citiesWithCounts = await this.sequelize.models.CitySceneryCache.findAll({
            include: [
                {
                    model: this.sequelize.models.City
                }
            ],
            attributes: {
                include: validSceneryArray.map((scenery) => [`${scenery}${radius}`, `${scenery}${radius}`])
            }
        });
        const cityScores = citiesWithCounts.map((cityWithCount) => {
            let count = 0;
            for (const scenery of validSceneryArray) {
                const column = `${scenery}${radius}`;
                count += cityWithCount?.dataValues?.[column] || 0;
            }
            return {
                city: cityWithCount?.City?.dataValues,
                count
            };
        });
        const topCities = cityScores.sort((a, b) => b.count - a.count).slice(0, 50);
        return topCities;
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
exports.SceneryService = SceneryService;
//# sourceMappingURL=scenery.class.js.map
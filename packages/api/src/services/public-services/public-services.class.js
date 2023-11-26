"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicServicesService = void 0;
class PublicServicesService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        let publicServicesArray = params.query?.publicServices || [];
        const radius = params.query?.searchRadius || 10;
        if (typeof publicServicesArray === 'string') {
            publicServicesArray = [publicServicesArray];
        }
        const citiesWithCounts = await this.sequelize.models.City.findAll({
            include: [
                {
                    model: this.sequelize.models.PublicServiceCache,
                    as: 'PublicServiceCache',
                    attributes: publicServicesArray.map((service) => `${service}${radius}`)
                }
            ]
        });
        const cityScores = citiesWithCounts.map((cityWithCount) => {
            let count = 0;
            for (const service of publicServicesArray) {
                const column = `${service}${radius}`;
                count += cityWithCount?.PublicServiceCache?.[column] || 0;
            }
            return {
                city_id: cityWithCount.city_id,
                count
            };
        });
        const sortedCities = cityScores.sort((a, b) => b.count - a.count).slice(0, 300);
        let ranking = 1;
        let previousCount = sortedCities[0]?.count || 0;
        const topCities = sortedCities.map((city, index) => {
            if (index > 0 && city.count < previousCount) {
                ranking = index + 1;
            }
            previousCount = city.count;
            return {
                ...city,
                ranking
            };
        });
        if (topCities.length < 10) {
            console.log('obtained less than 10 cities from public services');
        }
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
exports.PublicServicesService = PublicServicesService;
//# sourceMappingURL=public-services.class.js.map
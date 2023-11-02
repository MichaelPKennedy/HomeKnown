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
        // Fetch all cities along with their public service counts from cache
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
                city: cityWithCount,
                count
            };
        });
        cityScores.sort((a, b) => b.count - a.count);
        return cityScores;
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
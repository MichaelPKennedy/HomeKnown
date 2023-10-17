"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OccupationService = void 0;
const sequelize_1 = require("sequelize");
class OccupationService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        if (!params.query || !params.query.query) {
            throw new Error('Query parameter is missing.');
        }
        const inputQuery = params.query.query;
        const matchingOccupations = await this.sequelize.models.Occupation.findAll({
            where: {
                occ_title: {
                    [sequelize_1.Op.like]: `%${inputQuery}%`
                }
            },
            limit: 10
        });
        return matchingOccupations;
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
exports.OccupationService = OccupationService;
//# sourceMappingURL=occupation.class.js.map
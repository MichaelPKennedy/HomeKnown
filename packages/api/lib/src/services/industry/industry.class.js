"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryService = void 0;
const sequelize_1 = require("sequelize");
const state_model_1 = require("../../../models/state.model");
class IndustryService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async getNationalAverageForOccupation(occ_code) {
        const StateIndustrySalary = this.sequelize.models.StateIndustrySalary;
        const salary = await StateIndustrySalary.findOne({
            where: { occ_code: occ_code },
            attributes: [[this.sequelize.fn('AVG', this.sequelize.col('average_salary')), 'national_avg_salary']]
        });
        const hourly = await StateIndustrySalary.findOne({
            where: { occ_code: occ_code },
            attributes: [[this.sequelize.fn('AVG', this.sequelize.col('average_hourly')), 'national_avg_hourly']]
        });
        return {
            salary: parseFloat(salary.getDataValue('national_avg_salary')),
            hourly: parseFloat(hourly.getDataValue('national_avg_hourly'))
        };
    }
    async find(params) {
        const { selectedJobs, minSalary, jobLevel } = params;
        if (!selectedJobs || selectedJobs.length === 0) {
            throw new Error('No selected jobs provided.');
        }
        const occ_codes = selectedJobs.map((job) => job.occ_code);
        const nationalAverage = await this.getNationalAverageForOccupation(occ_codes[0]);
        let whereClause = {
            occ_code: { [sequelize_1.Op.in]: occ_codes },
            average_salary: {
                [sequelize_1.Op.gte]: minSalary
            }
        };
        // Adjusting for job level
        if (jobLevel === 'entry-level') {
            whereClause['average_salary'] = {
                [sequelize_1.Op.lte]: this.sequelize.col('h_median')
            };
        }
        else if (jobLevel === 'senior') {
            whereClause['average_salary'] = {
                [sequelize_1.Op.gt]: this.sequelize.col('h_median')
            };
        }
        const StateIndustrySalary = this.sequelize.models.StateIndustrySalary;
        const results = await StateIndustrySalary.findAll({
            where: whereClause,
            attributes: [
                'state_code',
                [this.sequelize.fn('AVG', this.sequelize.col('StateIndustrySalary.average_salary')), 'avg_salary'],
                [this.sequelize.fn('AVG', this.sequelize.col('StateIndustrySalary.average_hourly')), 'avg_hourly']
            ],
            include: [
                {
                    model: state_model_1.State,
                    attributes: ['state']
                }
            ],
            group: ['state_code'],
            order: [[this.sequelize.col('avg_salary'), 'DESC']],
            limit: 10
        });
        const topStateCodes = results.map((record) => record.getDataValue('state_code'));
        //get top cities
        const CityIndustrySalary = this.sequelize.models.CityIndustrySalary;
        const Area = this.sequelize.models.Area;
        const topCities = await CityIndustrySalary.findAll({
            where: {
                ...whereClause
            },
            attributes: [
                'area_code',
                [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_salary')), 'avg_salary'],
                [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_hourly')), 'avg_hourly']
            ],
            include: [
                {
                    model: Area,
                    attributes: ['area_title'],
                    where: {
                        state_code: {
                            [sequelize_1.Op.in]: topStateCodes
                        }
                    },
                    include: [
                        {
                            model: state_model_1.State,
                            attributes: ['state']
                        }
                    ]
                }
            ],
            group: ['area_code'],
            order: [[this.sequelize.col('avg_salary'), 'DESC']],
            limit: 10
        });
        return {
            jobs: selectedJobs.map((job) => job.occ_title),
            nationalAverage,
            topStates: results,
            topCities: topCities
        };
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
exports.IndustryService = IndustryService;
//# sourceMappingURL=industry.class.js.map
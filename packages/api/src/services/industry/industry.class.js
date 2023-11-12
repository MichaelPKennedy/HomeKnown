"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryService = void 0;
const sequelize_1 = require("sequelize");
class IndustryService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        const queryData = params.query;
        if (!queryData) {
            throw new Error('No query data provided.');
        }
        console.log('queryData', queryData);
        const { selectedJobs, minSalary, jobLevel } = queryData;
        if (!selectedJobs || selectedJobs.length === 0) {
            throw new Error('No selected jobs provided.');
        }
        const occ_codes = selectedJobs.map((job) => job.occ_code);
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
        //get top cities
        const CityIndustrySalary = this.sequelize.models.CityIndustrySalary;
        const Area = this.sequelize.models.Area;
        const topAreas = await CityIndustrySalary.findAll({
            where: {
                ...whereClause
            },
            attributes: [
                'area_code',
                [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_salary')), 'avg_salary'],
                [this.sequelize.fn('AVG', this.sequelize.col('CityIndustrySalary.average_hourly')), 'avg_hourly']
            ],
            group: ['area_code'],
            order: [[this.sequelize.col('avg_salary'), 'DESC']],
            limit: 30
        });
        //for top cities, get the cities that are associated with the area_code for that city
        const topCities = await this.sequelize.models.City.findAll({
            attributes: ['city_id', 'area_code'],
            where: {
                area_code: topAreas.map((city) => city.area_code)
            }
        });
        //map the cities to their salary
        const topCitiesWithSalary = topAreas
            .map((city) => {
            const relatedCities = topCities.filter((c) => c.area_code === city.area_code);
            return relatedCities.map((cityData) => ({
                city_id: cityData.city_id,
                avg_salary: city.dataValues.avg_salary,
                avg_hourly: city.dataValues.avg_hourly
            }));
        })
            .flat()
            .slice(0, 30);
        const sortedCitiesWithSalary = topCitiesWithSalary.sort((a, b) => b.avg_salary - a.avg_salary);
        let ranking = 1;
        let skipRank = 0;
        let previousAvgSalary = sortedCitiesWithSalary[0]?.avg_salary;
        const rankedCitiesWithSalary = sortedCitiesWithSalary.map((city, index) => {
            if (city.avg_salary !== previousAvgSalary) {
                ranking += skipRank;
                skipRank = 1;
            }
            else {
                if (index !== 0) {
                    skipRank++;
                }
            }
            previousAvgSalary = city.avg_salary;
            return {
                ...city,
                ranking
            };
        });
        if (rankedCitiesWithSalary.length < 10) {
            console.log('obtained less than 10 cities from industry');
        }
        return {
            jobs: selectedJobs.map((job) => job.occ_title),
            topCities: rankedCitiesWithSalary
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
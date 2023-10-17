"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityIndustrySalaryModel = exports.CityIndustrySalary = void 0;
const sequelize_1 = require("sequelize");
class CityIndustrySalary extends sequelize_1.Model {
}
exports.CityIndustrySalary = CityIndustrySalary;
const CityIndustrySalaryModel = (sequelize) => {
    CityIndustrySalary.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        area_code: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: 'Area',
                key: 'area_code'
            }
        },
        occ_code: {
            type: sequelize_1.DataTypes.STRING(20),
            references: {
                model: 'Occupation',
                key: 'occ_code'
            }
        },
        tot_emp: sequelize_1.DataTypes.INTEGER,
        average_hourly: sequelize_1.DataTypes.DECIMAL(10, 2),
        average_salary: sequelize_1.DataTypes.DECIMAL(10, 2),
        h_pct10: sequelize_1.DataTypes.DECIMAL(10, 2),
        h_pct25: sequelize_1.DataTypes.DECIMAL(10, 2),
        h_median: sequelize_1.DataTypes.DECIMAL(10, 2),
        h_pct75: sequelize_1.DataTypes.DECIMAL(10, 2),
        h_pct90: sequelize_1.DataTypes.DECIMAL(10, 2),
        a_pct10: sequelize_1.DataTypes.DECIMAL(10, 2),
        a_pct25: sequelize_1.DataTypes.DECIMAL(10, 2),
        a_median: sequelize_1.DataTypes.DECIMAL(10, 2),
        a_pct75: sequelize_1.DataTypes.DECIMAL(10, 2),
        a_pct90: sequelize_1.DataTypes.DECIMAL(10, 2)
    }, {
        sequelize,
        tableName: 'CityIndustrySalary',
        timestamps: false
    });
};
exports.CityIndustrySalaryModel = CityIndustrySalaryModel;
//# sourceMappingURL=city-industry-salary.model.js.map
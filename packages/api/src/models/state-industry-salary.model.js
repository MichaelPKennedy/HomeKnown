"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateIndustrySalaryModel = exports.StateIndustrySalary = void 0;
const sequelize_1 = require("sequelize");
class StateIndustrySalary extends sequelize_1.Model {
}
exports.StateIndustrySalary = StateIndustrySalary;
const StateIndustrySalaryModel = (sequelize) => {
    StateIndustrySalary.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state_code: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: 'State',
                key: 'state_code'
            }
        },
        naics_code: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: 'NAICS',
                key: 'naics_code'
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
        pct_employment: sequelize_1.DataTypes.DECIMAL(5, 2),
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
        a_pct90: sequelize_1.DataTypes.DECIMAL(10, 2),
        annual: sequelize_1.DataTypes.BOOLEAN,
        hourly: sequelize_1.DataTypes.BOOLEAN
    }, {
        sequelize,
        tableName: 'StateIndustrySalary',
        timestamps: false
    });
};
exports.StateIndustrySalaryModel = StateIndustrySalaryModel;
//# sourceMappingURL=state-industry-salary.model.js.map
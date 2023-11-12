"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateModel = exports.State = void 0;
const sequelize_1 = require("sequelize");
const state_industry_salary_model_1 = require("./state-industry-salary.model");
class State extends sequelize_1.Model {
}
exports.State = State;
const StateModel = (sequelize) => {
    State.init({
        state_code: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true
        },
        state: {
            type: sequelize_1.DataTypes.STRING(25),
            allowNull: false
        },
        state_abbrev: {
            type: sequelize_1.DataTypes.CHAR(2)
        },
        totalCostIndex: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        },
        GroceryCostsIndex: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        },
        HealthCostsIndex: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        },
        HousingCostsIndex: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        },
        MiscCostsIndex: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        },
        TranspCostsIndex: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        },
        UtilCostsIndex: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        }
    }, {
        sequelize,
        tableName: 'State',
        timestamps: false
    });
    State.hasMany(state_industry_salary_model_1.StateIndustrySalary, { foreignKey: 'state_code' });
    state_industry_salary_model_1.StateIndustrySalary.belongsTo(State, { foreignKey: 'state_code' });
};
exports.StateModel = StateModel;
//# sourceMappingURL=state.model.js.map
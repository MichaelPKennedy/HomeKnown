"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaModel = exports.Area = void 0;
const sequelize_1 = require("sequelize");
const city_industry_salary_model_1 = require("./city-industry-salary.model");
const state_model_1 = require("./state.model");
class Area extends sequelize_1.Model {
}
exports.Area = Area;
const AreaModel = (sequelize) => {
    Area.init({
        area_code: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true
        },
        area_title: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        area_type: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false
        },
        type_description: {
            type: sequelize_1.DataTypes.STRING(25),
            allowNull: true
        },
        state_code: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: state_model_1.State,
                key: 'state_code'
            }
        }
    }, {
        sequelize,
        tableName: 'Area',
        timestamps: false
    });
    Area.hasMany(city_industry_salary_model_1.CityIndustrySalary, { foreignKey: 'area_code' });
    city_industry_salary_model_1.CityIndustrySalary.belongsTo(Area, { foreignKey: 'area_code' });
    Area.belongsTo(state_model_1.State, { foreignKey: 'state_code' });
};
exports.AreaModel = AreaModel;
//# sourceMappingURL=area.model.js.map
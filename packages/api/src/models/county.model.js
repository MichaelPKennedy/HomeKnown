"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountyModel = exports.County = void 0;
const sequelize_1 = require("sequelize");
const state_model_1 = require("./state.model");
const city_model_1 = require("./city.model");
class County extends sequelize_1.Model {
}
exports.County = County;
const CountyModel = (sequelize) => {
    County.init({
        county_fips: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        county_name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        state_code: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: state_model_1.State,
                key: 'state_code'
            }
        }
    }, {
        sequelize,
        tableName: 'County',
        timestamps: false,
        indexes: [
            {
                name: 'state_code',
                fields: ['state_code']
            }
        ]
    });
    County.belongsTo(state_model_1.State, { foreignKey: 'state_code' });
    County.hasMany(city_model_1.City, { foreignKey: 'county_fips' });
};
exports.CountyModel = CountyModel;
//# sourceMappingURL=county.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityMonthlyWeatherCountyModel = exports.CityMonthlyWeatherCounty = void 0;
const sequelize_1 = require("sequelize");
const city_model_1 = require("./city.model");
class CityMonthlyWeatherCounty extends sequelize_1.Model {
}
exports.CityMonthlyWeatherCounty = CityMonthlyWeatherCounty;
const CityMonthlyWeatherCountyModel = (sequelize) => {
    CityMonthlyWeatherCounty.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: city_model_1.City,
                key: 'city_id'
            }
        },
        month: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        avg_temp: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            defaultValue: null
        },
        anomaly: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            defaultValue: null
        },
        rank: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: null
        },
        max_temp: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            defaultValue: null
        },
        min_temp: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            defaultValue: null
        }
    }, {
        sequelize,
        tableName: 'CityMonthlyWeatherCounty',
        timestamps: false,
        indexes: [
            {
                name: 'city_id',
                fields: ['city_id']
            }
        ]
    });
    CityMonthlyWeatherCounty.belongsTo(city_model_1.City, { foreignKey: 'city_id' });
};
exports.CityMonthlyWeatherCountyModel = CityMonthlyWeatherCountyModel;
//# sourceMappingURL=city-monthly-weather-county.model.js.map
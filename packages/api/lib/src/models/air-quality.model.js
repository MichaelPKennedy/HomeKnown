"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirQualityModel = exports.AirQuality = void 0;
const sequelize_1 = require("sequelize");
const area_model_1 = require("./area.model");
class AirQuality extends sequelize_1.Model {
}
exports.AirQuality = AirQuality;
const AirQualityModel = (sequelize) => {
    AirQuality.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        area_code: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: area_model_1.Area,
                key: 'area_code'
            }
        },
        area_name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        population_2010: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        CO_8hr_ppm: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        Pb_3mo_ug_m3: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        NO2_AM_ppb: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        NO2_1hr_ppb: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        O3_8hr_ppm: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        PM10_24hr_ug_m3: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        PM2_5_Wtd_AM_ug_m3: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        PM2_5_24hr_ug_m3: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        },
        SO2_1hr_ppb: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'AirQuality',
        indexes: [
            {
                name: 'idx_airquality_area_code',
                fields: ['area_code']
            }
        ],
        timestamps: false
    });
    AirQuality.belongsTo(area_model_1.Area, { foreignKey: 'area_code' });
};
exports.AirQualityModel = AirQualityModel;
//# sourceMappingURL=air-quality.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = exports.City = void 0;
const sequelize_1 = require("sequelize");
const area_model_1 = require("./area.model");
class City extends sequelize_1.Model {
}
exports.City = City;
const CityModel = (sequelize) => {
    City.init({
        city_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        area_code: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: area_model_1.Area,
                key: 'area_code'
            }
        },
        Latitude: {
            type: sequelize_1.DataTypes.DECIMAL(9, 6),
            allowNull: true
        },
        Longitude: {
            type: sequelize_1.DataTypes.DECIMAL(9, 6),
            allowNull: true
        },
        currentHomePrice: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'City',
        indexes: [
            {
                name: 'idx_city_area_code',
                fields: ['area_code']
            }
        ],
        timestamps: false
    });
    City.belongsTo(area_model_1.Area, { foreignKey: 'area_code' });
};
exports.CityModel = CityModel;
//# sourceMappingURL=city.model.js.map
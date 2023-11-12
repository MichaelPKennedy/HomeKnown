"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityDemographicsModel = exports.CityDemographics = void 0;
const sequelize_1 = require("sequelize");
const city_model_1 = require("./city.model");
class CityDemographics extends sequelize_1.Model {
}
exports.CityDemographics = CityDemographics;
const CityDemographicsModel = (sequelize) => {
    CityDemographics.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: city_model_1.City,
                key: 'city_id'
            },
            unique: 'unique_city_id'
        },
        median_age: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        male_population: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        female_population: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        number_of_veterans: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        foreign_born: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        average_household_size: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'CityDemographics',
        timestamps: false,
        indexes: [
            {
                name: 'unique_city_id',
                unique: true,
                fields: ['city_id']
            }
        ]
    });
    CityDemographics.belongsTo(city_model_1.City, { foreignKey: 'city_id' });
};
exports.CityDemographicsModel = CityDemographicsModel;
//# sourceMappingURL=city-demographics.model.js.map
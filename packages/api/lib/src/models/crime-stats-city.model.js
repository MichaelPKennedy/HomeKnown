"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrimeStatsCityModel = exports.CrimeStatsCity = void 0;
const sequelize_1 = require("sequelize");
class CrimeStatsCity extends sequelize_1.Model {
}
exports.CrimeStatsCity = CrimeStatsCity;
const CrimeStatsCityModel = (sequelize) => {
    CrimeStatsCity.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        state: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: true
        },
        population: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        violent_crime: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        murder_and_nonnegligent_manslaughter: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        rape: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        robbery: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        aggravated_assault: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        property_crime: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        burglary: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        larceny_theft: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        motor_vehicle_theft: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        arson: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        crime_score: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'CrimeStatsCity',
        timestamps: false
    });
};
exports.CrimeStatsCityModel = CrimeStatsCityModel;
//# sourceMappingURL=crime-stats-city.model.js.map
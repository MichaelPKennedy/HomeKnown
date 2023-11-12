"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherModel = exports.Weather = void 0;
const sequelize_1 = require("sequelize");
const state_model_1 = require("./state.model");
class Weather extends sequelize_1.Model {
}
exports.Weather = Weather;
const WeatherModel = (sequelize) => {
    Weather.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state_code: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'State',
                key: 'state_code'
            }
        },
        year: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        month: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        avgTemp: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2)
        }
    }, {
        sequelize,
        tableName: 'Weather',
        timestamps: false
    });
    Weather.belongsTo(state_model_1.State, { foreignKey: 'state_code' });
    state_model_1.State.hasMany(Weather, { foreignKey: 'state_code' });
};
exports.WeatherModel = WeatherModel;
//# sourceMappingURL=weather.model.js.map
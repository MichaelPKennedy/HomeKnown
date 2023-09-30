"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityWeatherModel = exports.CityWeather = void 0;
const sequelize_1 = require("sequelize");
const state_model_1 = require("./state.model");
class CityWeather extends sequelize_1.Model {
}
exports.CityWeather = CityWeather;
const CityWeatherModel = (sequelize) => {
    CityWeather.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: sequelize_1.DataTypes.STRING(5),
            allowNull: false
        },
        area_code: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: 'Area',
                key: 'area_code'
            }
        },
        jan_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        feb_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        mar_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        apr_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        may_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        jun_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        jul_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        aug_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        sep_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        oct_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        nov_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        dec_high: sequelize_1.DataTypes.DECIMAL(5, 2),
        jan_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        feb_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        mar_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        apr_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        may_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        jun_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        jul_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        aug_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        sep_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        oct_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        nov_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        dec_low: sequelize_1.DataTypes.DECIMAL(5, 2),
        jan_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        feb_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        mar_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        apr_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        may_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        jun_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        jul_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        aug_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        sep_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        oct_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        nov_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        dec_prec: sequelize_1.DataTypes.DECIMAL(5, 2),
        jan_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        feb_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        mar_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        apr_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        may_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        jun_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        jul_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        aug_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        sep_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        oct_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        nov_snow: sequelize_1.DataTypes.DECIMAL(5, 2),
        dec_snow: sequelize_1.DataTypes.DECIMAL(5, 2)
    }, {
        sequelize,
        tableName: 'CityWeather',
        timestamps: false
    });
    CityWeather.belongsTo(state_model_1.State, { foreignKey: 'state', targetKey: 'state_abbrev' });
    state_model_1.State.hasMany(CityWeather, { foreignKey: 'state', sourceKey: 'state_abbrev' });
};
exports.CityWeatherModel = CityWeatherModel;
//# sourceMappingURL=city-weather.model.js.map
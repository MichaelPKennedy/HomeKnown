"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitySceneryCacheModel = exports.CitySceneryCache = void 0;
const sequelize_1 = require("sequelize");
const city_model_1 = require("./city.model");
class CitySceneryCache extends sequelize_1.Model {
}
exports.CitySceneryCache = CitySceneryCache;
const CitySceneryCacheModel = (sequelize) => {
    CitySceneryCache.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: city_model_1.City,
                key: 'city_id'
            }
        },
        ...['forests', 'lakes_rivers', 'mountains', 'beaches'].reduce((acc, type) => {
            for (let i = 10; i <= 50; i += 5) {
                acc[`${type}${i}`] = {
                    type: sequelize_1.DataTypes.INTEGER,
                    defaultValue: 0
                };
            }
            return acc;
        }, {})
    }, {
        sequelize,
        tableName: 'CitySceneryCache',
        timestamps: false,
        indexes: [
            {
                name: 'city_id',
                fields: ['city_id']
            }
        ]
    });
    CitySceneryCache.belongsTo(city_model_1.City, { foreignKey: 'city_id' });
};
exports.CitySceneryCacheModel = CitySceneryCacheModel;
//# sourceMappingURL=city-scenery-cache.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicServiceCacheModel = exports.PublicServiceCache = void 0;
const sequelize_1 = require("sequelize");
const city_model_1 = require("./city.model");
class PublicServiceCache extends sequelize_1.Model {
}
exports.PublicServiceCache = PublicServiceCache;
const PublicServiceCacheModel = (sequelize) => {
    PublicServiceCache.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        city_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: city_model_1.City,
                key: 'city_id'
            }
        },
        schools10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        schools50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        hospitals50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        libraries50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        emergencyServices50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        airports50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        transitStations50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        marineTerminals50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        placesOfWorship50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks10: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks15: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks20: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks25: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks30: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks35: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks40: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks45: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
        localParks50: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 }
    }, {
        sequelize,
        tableName: 'PublicServiceCache',
        timestamps: false,
        indexes: [
            {
                name: 'city_id',
                fields: ['city_id']
            }
        ]
    });
    PublicServiceCache.belongsTo(city_model_1.City, { foreignKey: 'city_id' });
};
exports.PublicServiceCacheModel = PublicServiceCacheModel;
//# sourceMappingURL=public-service-cache.model.js.map
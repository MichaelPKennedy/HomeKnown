import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class PublicServiceCache extends Model {}

export const PublicServiceCacheModel = (sequelize: Sequelize) => {
  PublicServiceCache.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      schools10: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools15: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools20: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools25: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools30: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools35: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools40: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools45: { type: DataTypes.INTEGER, defaultValue: 0 },
      schools50: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals10: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals15: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals20: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals25: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals30: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals35: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals40: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals45: { type: DataTypes.INTEGER, defaultValue: 0 },
      hospitals50: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries10: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries15: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries20: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries25: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries30: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries35: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries40: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries45: { type: DataTypes.INTEGER, defaultValue: 0 },
      libraries50: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices10: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices15: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices20: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices25: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices30: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices35: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices40: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices45: { type: DataTypes.INTEGER, defaultValue: 0 },
      emergencyServices50: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports10: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports15: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports20: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports25: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports30: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports35: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports40: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports45: { type: DataTypes.INTEGER, defaultValue: 0 },
      airports50: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations10: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations15: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations20: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations25: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations30: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations35: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations40: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations45: { type: DataTypes.INTEGER, defaultValue: 0 },
      transitStations50: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals10: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals15: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals20: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals25: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals30: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals35: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals40: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals45: { type: DataTypes.INTEGER, defaultValue: 0 },
      marineTerminals50: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship10: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship15: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship20: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship25: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship30: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship35: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship40: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship45: { type: DataTypes.INTEGER, defaultValue: 0 },
      placesOfWorship50: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks10: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks15: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks20: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks25: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks30: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks35: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks40: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks45: { type: DataTypes.INTEGER, defaultValue: 0 },
      localParks50: { type: DataTypes.INTEGER, defaultValue: 0 }
    },
    {
      sequelize,
      tableName: 'PublicServiceCache',
      timestamps: false,
      indexes: [
        {
          name: 'city_id',
          fields: ['city_id']
        }
      ]
    }
  )

  PublicServiceCache.belongsTo(City, { foreignKey: 'city_id' })
}

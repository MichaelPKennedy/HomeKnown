import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CityPlacesCache extends Model {}

export const CityPlacesCacheModel = (sequelize: Sequelize) => {
  CityPlacesCache.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      place_type: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      place_count: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      environment: {
        type: DataTypes.STRING(10),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'CityPlacesCache',
      tableName: 'CityPlacesCache',
      timestamps: false
    }
  )
}

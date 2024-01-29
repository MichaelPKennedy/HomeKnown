import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CitySnowCache extends Model {}

export const CitySnowCacheModel = (sequelize: Sequelize) => {
  CitySnowCache.init(
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
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_snow: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'CitySnowCache',
      timestamps: false,
      indexes: [
        {
          name: 'idx_city_id_year',
          unique: false,
          fields: ['city_id', 'year']
        }
      ]
    }
  )
}

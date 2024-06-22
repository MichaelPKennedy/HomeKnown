import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CityDescriptions extends Model {}

export const CityDescriptionsModel = (sequelize: Sequelize) => {
  CityDescriptions.init(
    {
      city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      recreation: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      housing: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      costOfLiving: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      industry: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      weather: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'CityDescriptions',
      timestamps: false,
      indexes: [
        {
          name: 'idx_city_id',
          unique: false,
          fields: ['city_id']
        }
      ]
    }
  )
}

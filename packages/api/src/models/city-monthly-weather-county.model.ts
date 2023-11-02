import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CityMonthlyWeatherCounty extends Model {}

export const CityMonthlyWeatherCountyModel = (sequelize: Sequelize) => {
  CityMonthlyWeatherCounty.init(
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
      month: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      avg_temp: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      anomaly: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      rank: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      max_temp: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      min_temp: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      snow: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      rain: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      }
    },
    {
      sequelize,
      tableName: 'CityMonthlyWeatherCounty',
      timestamps: false,
      indexes: [
        {
          name: 'city_id',
          fields: ['city_id']
        }
      ]
    }
  )

  CityMonthlyWeatherCounty.belongsTo(City, { foreignKey: 'city_id' })
}

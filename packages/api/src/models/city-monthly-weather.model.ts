import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CityMonthlyWeather extends Model {}

export const CityMonthlyWeatherModel = (sequelize: Sequelize) => {
  CityMonthlyWeather.init(
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
      precip: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      snow: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      hum_avg: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      hum_max: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      hum_min: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      ghcnId: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      avg_wind_speed: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      avg_dew_point_temp: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      avg_wet_bulb_temp: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      atm_sea_level_pres: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      avg_min_temp: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      },
      avg_max_temp: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      }
    },
    {
      sequelize,
      tableName: 'CityMonthlyWeather',
      timestamps: false,
      indexes: [
        {
          name: 'city_id',
          fields: ['city_id']
        }
      ]
    }
  )
}

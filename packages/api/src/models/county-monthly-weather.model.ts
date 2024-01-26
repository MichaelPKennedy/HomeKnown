import { DataTypes, Model, Sequelize } from 'sequelize'
import { County } from './county.model'

export class CountyMonthlyWeather extends Model {}

export const CountyMonthlyWeatherModel = (sequelize: Sequelize) => {
  CountyMonthlyWeather.init(
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
          model: County,
          key: 'county_fips'
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
      }
    },
    {
      sequelize,
      tableName: 'CountyMonthlyWeather',
      timestamps: false
    }
  )
}

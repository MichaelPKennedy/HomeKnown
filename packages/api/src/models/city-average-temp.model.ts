import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CityAverageTemp extends Model {}

type CityAverageTempAttributes = {
  [key: string]: any
}

export const CityAverageTempModel = (sequelize: Sequelize) => {
  CityAverageTemp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      city_id: {
        type: DataTypes.INTEGER,
        references: {
          model: City,
          key: 'city_id'
        },
        unique: true
      },
      ...(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].reduce(
        (acc: CityAverageTempAttributes, month) => {
          acc[month] = {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: null
          }
          return acc
        },
        {}
      ) as CityAverageTempAttributes),
      rain: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      avg_humidity: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null
      }
    },
    {
      sequelize,
      tableName: 'CityAverageTemp',
      timestamps: false
    }
  )
}

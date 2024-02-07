import { DataTypes, Model, Sequelize } from 'sequelize'
import { County } from './county.model'

export class CountyAverageTemp extends Model {}

type CountyAverageTempAttributes = {
  [key: string]: any
}

export const CountyAverageTempModel = (sequelize: Sequelize) => {
  CountyAverageTemp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      county_fips: {
        type: DataTypes.INTEGER,
        references: {
          model: County,
          key: 'county_fips'
        },
        unique: true
      },
      ...(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].reduce(
        (acc: CountyAverageTempAttributes, month) => {
          acc[month] = {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: null
          }
          return acc
        },
        {}
      ) as CountyAverageTempAttributes),
      rain: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      }
    },
    {
      sequelize,
      tableName: 'CountyAverageTemp',
      timestamps: false,
      indexes: [
        {
          name: 'idx_avg_temp_search',
          fields: [
            'county_fips',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ]
        }
      ]
    }
  )

  CountyAverageTemp.belongsTo(County, { foreignKey: 'county_fips' })
}

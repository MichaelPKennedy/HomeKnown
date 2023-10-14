import { DataTypes, Model, Sequelize } from 'sequelize'
import { State } from './state.model'

export class Weather extends Model {}

export const WeatherModel = (sequelize: Sequelize) => {
  Weather.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      state_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'State',
          key: 'state_code'
        }
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      avgTemp: {
        type: DataTypes.DECIMAL(5, 2)
      }
    },
    {
      sequelize,
      tableName: 'Weather',
      timestamps: false
    }
  )
  Weather.belongsTo(State, { foreignKey: 'state_code' })
  State.hasMany(Weather, { foreignKey: 'state_code' })
}

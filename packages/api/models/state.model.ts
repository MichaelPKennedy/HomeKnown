import { DataTypes, Model, Sequelize } from 'sequelize'
import { StateIndustrySalary } from './state-industry-salary.model'
import { Weather } from './weather.model'
export class State extends Model {}

export const StateModel = (sequelize: Sequelize) => {
  State.init(
    {
      state_code: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      state: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      state_abbrev: {
        type: DataTypes.CHAR(2)
      }
    },
    {
      sequelize,
      tableName: 'State',
      timestamps: false
    }
  )
  State.hasMany(StateIndustrySalary, { foreignKey: 'state_code' })
  StateIndustrySalary.belongsTo(State, { foreignKey: 'state_code' })
}

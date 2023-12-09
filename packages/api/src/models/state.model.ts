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
      },
      totalCostIndex: {
        type: DataTypes.DECIMAL(10, 2)
      },
      GroceryCostsIndex: {
        type: DataTypes.DECIMAL(10, 2)
      },
      HealthCostsIndex: {
        type: DataTypes.DECIMAL(10, 2)
      },
      HousingCostsIndex: {
        type: DataTypes.DECIMAL(10, 2)
      },
      MiscCostsIndex: {
        type: DataTypes.DECIMAL(10, 2)
      },
      TranspCostsIndex: {
        type: DataTypes.DECIMAL(10, 2)
      },
      UtilCostsIndex: {
        type: DataTypes.DECIMAL(10, 2)
      }
    },
    {
      sequelize,
      tableName: 'State',
      timestamps: false
    }
  )
}

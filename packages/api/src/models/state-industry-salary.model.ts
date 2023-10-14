import { DataTypes, Model, Sequelize } from 'sequelize'

export class StateIndustrySalary extends Model {}

export const StateIndustrySalaryModel = (sequelize: Sequelize) => {
  StateIndustrySalary.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      state_code: {
        type: DataTypes.INTEGER,
        references: {
          model: 'State',
          key: 'state_code'
        }
      },
      naics_code: {
        type: DataTypes.INTEGER,
        references: {
          model: 'NAICS',
          key: 'naics_code'
        }
      },
      occ_code: {
        type: DataTypes.STRING(20),
        references: {
          model: 'Occupation',
          key: 'occ_code'
        }
      },
      tot_emp: DataTypes.INTEGER,
      pct_employment: DataTypes.DECIMAL(5, 2),
      average_hourly: DataTypes.DECIMAL(10, 2),
      average_salary: DataTypes.DECIMAL(10, 2),
      h_pct10: DataTypes.DECIMAL(10, 2),
      h_pct25: DataTypes.DECIMAL(10, 2),
      h_median: DataTypes.DECIMAL(10, 2),
      h_pct75: DataTypes.DECIMAL(10, 2),
      h_pct90: DataTypes.DECIMAL(10, 2),
      a_pct10: DataTypes.DECIMAL(10, 2),
      a_pct25: DataTypes.DECIMAL(10, 2),
      a_median: DataTypes.DECIMAL(10, 2),
      a_pct75: DataTypes.DECIMAL(10, 2),
      a_pct90: DataTypes.DECIMAL(10, 2),
      annual: DataTypes.BOOLEAN,
      hourly: DataTypes.BOOLEAN
    },
    {
      sequelize,
      tableName: 'StateIndustrySalary',
      timestamps: false
    }
  )
}

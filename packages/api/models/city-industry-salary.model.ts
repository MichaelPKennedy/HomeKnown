import { DataTypes, Model, Sequelize } from 'sequelize'

export class CityIndustrySalary extends Model {}

export const CityIndustrySalaryModel = (sequelize: Sequelize) => {
  CityIndustrySalary.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      area_code: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Area',
          key: 'area_code'
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
      a_pct90: DataTypes.DECIMAL(10, 2)
    },
    {
      sequelize,
      tableName: 'CityIndustrySalary',
      timestamps: false
    }
  )
}

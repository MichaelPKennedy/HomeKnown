import { DataTypes, Model, Sequelize } from 'sequelize'
import { CityIndustrySalary } from './city-industry-salary.model'
import { State } from './state.model'
import { City } from './city.model'

export class Area extends Model {}

export const AreaModel = (sequelize: Sequelize) => {
  Area.init(
    {
      area_code: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      area_title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      area_type: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      type_description: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      state_code: {
        type: DataTypes.INTEGER,
        references: {
          model: State,
          key: 'state_code'
        }
      }
    },
    {
      sequelize,
      tableName: 'Area',
      timestamps: false
    }
  )
}

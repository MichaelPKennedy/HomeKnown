import { DataTypes, Model, Sequelize } from 'sequelize'
import { State } from './state.model'
import { CrimeStats } from './crime-stats.model'
import { City } from './city.model'

export class County extends Model {}

export const CountyModel = (sequelize: Sequelize) => {
  County.init(
    {
      county_fips: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      county_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      state_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: State,
          key: 'state_code'
        }
      }
    },
    {
      sequelize,
      tableName: 'County',
      timestamps: false,
      indexes: [
        {
          name: 'state_code',
          fields: ['state_code']
        }
      ]
    }
  )

  County.belongsTo(State, { foreignKey: 'state_code' })
  County.hasMany(City, { foreignKey: 'county_fips' })
}

import { DataTypes, Model, Sequelize } from 'sequelize'
import { County } from './county.model'
import { State } from './state.model'

export class CrimeStats extends Model {}

export const CrimeStatsModel = (sequelize: Sequelize) => {
  CrimeStats.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      stcofips: {
        type: DataTypes.INTEGER,
        references: {
          model: County,
          key: 'county_fips'
        }
      },
      fips_st: {
        type: DataTypes.INTEGER,
        references: {
          model: State,
          key: 'state_code'
        }
      },
      fips_cty: {
        type: DataTypes.INTEGER
      },
      year: {
        type: DataTypes.STRING(4)
      },
      studyno: {
        type: DataTypes.STRING(255)
      },
      edition: {
        type: DataTypes.STRING(255)
      },
      part: {
        type: DataTypes.STRING(255)
      },
      idno: {
        type: DataTypes.INTEGER
      },
      cpoparst: {
        type: DataTypes.INTEGER
      },
      cpocrim: {
        type: DataTypes.INTEGER
      },
      ag_arrst: {
        type: DataTypes.INTEGER
      },
      ag_off: {
        type: DataTypes.INTEGER
      },
      covind: {
        type: DataTypes.DECIMAL(5, 2)
      },
      total_crime: {
        type: DataTypes.INTEGER
      },
      modindx: {
        type: DataTypes.INTEGER
      },
      viol: {
        type: DataTypes.INTEGER
      },
      property: {
        type: DataTypes.INTEGER
      },
      murder: {
        type: DataTypes.INTEGER
      },
      rape: {
        type: DataTypes.INTEGER
      },
      robbery: {
        type: DataTypes.INTEGER
      },
      agasslt: {
        type: DataTypes.INTEGER
      },
      burglry: {
        type: DataTypes.INTEGER
      },
      larceny: {
        type: DataTypes.INTEGER
      },
      mvtheft: {
        type: DataTypes.INTEGER
      },
      arson: {
        type: DataTypes.INTEGER
      },
      crime_score: {
        type: DataTypes.DECIMAL(10, 2)
      }
    },
    {
      sequelize,
      tableName: 'CrimeStats',
      timestamps: false,
      indexes: [
        {
          name: 'stcofips',
          fields: ['stcofips']
        },
        {
          name: 'fips_st',
          fields: ['fips_st']
        }
      ]
    }
  )
}

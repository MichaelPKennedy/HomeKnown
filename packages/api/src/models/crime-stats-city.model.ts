import { DataTypes, Model, Sequelize } from 'sequelize'

export class CrimeStatsCity extends Model {}

export const CrimeStatsCityModel = (sequelize: Sequelize) => {
  CrimeStatsCity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      violent_crime: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      murder_and_nonnegligent_manslaughter: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      rape: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      robbery: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      aggravated_assault: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      property_crime: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      burglary: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      larceny_theft: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      motor_vehicle_theft: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      arson: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      crime_score: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'CrimeStatsCity',
      timestamps: false
    }
  )
}

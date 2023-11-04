import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CityDemographics extends Model {}

export const CityDemographicsModel = (sequelize: Sequelize) => {
  CityDemographics.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: City,
          key: 'city_id'
        },
        unique: 'unique_city_id'
      },
      median_age: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },
      male_population: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      female_population: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      number_of_veterans: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      foreign_born: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      average_household_size: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'CityDemographics',
      timestamps: false,
      indexes: [
        {
          name: 'unique_city_id',
          unique: true,
          fields: ['city_id']
        }
      ]
    }
  )

  CityDemographics.belongsTo(City, { foreignKey: 'city_id' })
}

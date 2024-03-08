import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class TopCities extends Model {}

export const TopCitiesModel = (sequelize: Sequelize) => {
  TopCities.init(
    {
      ranking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'TopCities',
      timestamps: false
    }
  )
}

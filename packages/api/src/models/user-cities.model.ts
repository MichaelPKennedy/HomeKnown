import { DataTypes, Model, Sequelize } from 'sequelize'
import { Users } from './users.model'
import { City } from './city.model'

export class UserCities extends Model {}

export const UserCitiesModel = (sequelize: Sequelize) => {
  UserCities.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: 'user_id'
        },
        primaryKey: true
      },
      city_id: {
        type: DataTypes.INTEGER,
        references: {
          model: City,
          key: 'city_id'
        },
        primaryKey: true
      }
    },
    {
      sequelize,
      tableName: 'UserCities',
      timestamps: true
    }
  )

  return UserCities
}

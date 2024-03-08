import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model' // Assuming you have a City model defined similarly
import { Users } from './users.model' // Assuming you have a User model defined

export class UserRecommendedCities extends Model {}

export const UserRecommendedCitiesModel = (sequelize: Sequelize) => {
  UserRecommendedCities.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Users,
          key: 'user_id'
        }
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'UserRecommendedCities',
      timestamps: true
    }
  )
}

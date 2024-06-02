import { DataTypes, Model, Sequelize } from 'sequelize'
import { Users } from './users.model'

export class UserNotifications extends Model {}

export const UserNotificationsModel = (sequelize: Sequelize) => {
  UserNotifications.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: 'user_id'
        }
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      promotional: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      recommendations: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      newsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      feedback: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'UserNotifications',
      tableName: 'UserNotifications',
      timestamps: false,
      indexes: [
        {
          name: 'user_id',
          fields: ['user_id']
        },
        {
          name: 'user_id_type',
          fields: ['user_id', 'type']
        }
      ]
    }
  )
}

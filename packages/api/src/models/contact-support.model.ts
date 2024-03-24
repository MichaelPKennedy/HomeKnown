import { DataTypes, Model, Sequelize } from 'sequelize'
import { Users } from './users.model'

export class ContactSupport extends Model {}

export const ContactSupportModel = (sequelize: Sequelize) => {
  ContactSupport.init(
    {
      message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      issue_type: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      is_resolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Users,
          key: 'user_id'
        }
      }
    },
    {
      sequelize,
      tableName: 'ContactSupport',
      timestamps: true
    }
  )
}

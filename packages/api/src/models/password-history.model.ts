import { DataTypes, Model, Sequelize } from 'sequelize'
import { Users } from './users.model'

export class PasswordHistory extends Model {}

export const PasswordHistoryModel = (sequelize: Sequelize) => {
  PasswordHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: 'user_id'
        }
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: 'PasswordHistory',
      tableName: 'PasswordHistory',
      timestamps: false
    }
  )
}

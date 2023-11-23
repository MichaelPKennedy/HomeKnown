import { DataTypes, Model, Sequelize } from 'sequelize'

export class Users extends Model {}

export const UsersModel = (sequelize: Sequelize) => {
  Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      primary_email: {
        type: DataTypes.STRING(50),
        unique: true,
        defaultValue: null
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'Users',
      timestamps: false,
      indexes: [
        {
          name: 'unique_username',
          unique: true,
          fields: ['username']
        },
        {
          name: 'unique_email',
          unique: true,
          fields: ['primary_email']
        }
      ]
    }
  )
}

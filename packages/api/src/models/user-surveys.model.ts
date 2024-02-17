import { DataTypes, Model, Sequelize } from 'sequelize'
import { Users } from './users.model'

export class UserSurveys extends Model {}

export const UserSurveysModel = (sequelize: Sequelize) => {
  UserSurveys.init(
    {
      Id: {
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
      costOfLivingWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      recreationWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      weatherWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      sceneryWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      industryWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      publicServicesWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      crimeWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      airQualityWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      job1: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      job2: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      job1Salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      job2Salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      entertainment: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      foodAndDrinks: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      historyAndCulture: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      beaches: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      nature: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      winterSports: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      adventureAndSports: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      wellness: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      yearly_avg_temp_norm: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },
      temp_variance_norm: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },
      max_temp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      min_temp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      precipitation: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      snow: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      pop_min: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      pop_max: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      northeast: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      midwest: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      south: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      west: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'UserSurveys',
      tableName: 'UserSurveys',
      timestamps: true,
      paranoid: true
    }
  )
}

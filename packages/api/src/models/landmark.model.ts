import { DataTypes, Model, Sequelize } from 'sequelize'
import { MTFCC } from './MTFCC.model'
export class LandMark extends Model {}

export const LandMarkModel = (sequelize: Sequelize) => {
  LandMark.init(
    {
      X: {
        type: DataTypes.DOUBLE
      },
      Y: {
        type: DataTypes.DOUBLE
      },
      STATEFP: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ANSICODE: {
        type: DataTypes.INTEGER
      },
      POINTID: {
        type: DataTypes.STRING(255),
        primaryKey: true
      },
      FULLNAME: {
        type: DataTypes.STRING(255)
      },
      MTFCC: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
          model: MTFCC,
          key: 'MTFCC'
        }
      }
    },
    {
      sequelize,
      tableName: 'LandMark',
      timestamps: false
    }
  )
}

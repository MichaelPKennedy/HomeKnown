import { DataTypes, Model, Sequelize } from 'sequelize'
export class MTFCC extends Model {}

export const MTFCCModel = (sequelize: Sequelize) => {
  MTFCC.init(
    {
      MTFCC: {
        type: DataTypes.STRING(10),
        primaryKey: true
      },
      Feature_Class: {
        type: DataTypes.STRING(500)
      },
      Superclass: {
        type: DataTypes.STRING(500)
      }
    },
    {
      sequelize,
      tableName: 'MTFCC',
      timestamps: false
    }
  )
}

import { DataTypes, Model, Sequelize } from 'sequelize'

export class NAICS extends Model {}

export const NAICSModel = (sequelize: Sequelize) => {
  NAICS.init(
    {
      naics_code: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      naics_title: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'NAICS',
      timestamps: false
    }
  )
}

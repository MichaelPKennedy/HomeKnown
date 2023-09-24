import { DataTypes, Model, Sequelize } from 'sequelize'

export class Occupation extends Model {}

export const OccupationModel = (sequelize: Sequelize) => {
  Occupation.init(
    {
      occ_code: {
        type: DataTypes.STRING(20),
        primaryKey: true
      },
      occ_title: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'Occupation',
      timestamps: false
    }
  )
}

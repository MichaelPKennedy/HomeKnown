import { DataTypes, Model, Sequelize } from 'sequelize'

export class LandMark extends Model {}

export const LandMarkModel = (sequelize: Sequelize) => {
  LandMark.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Location: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      Type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
      },
      Longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'LandMarks',
      timestamps: false
    }
  )
}

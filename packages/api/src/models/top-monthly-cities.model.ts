import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class TopMonthlyCities extends Model {}

export const TopMonthlyCitiesModel = (sequelize: Sequelize) => {
  TopMonthlyCities.init(
    {
      ranking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'TopMonthlyCities',
      timestamps: false
    }
  )
}

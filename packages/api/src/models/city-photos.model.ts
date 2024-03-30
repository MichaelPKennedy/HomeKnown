import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CityPhotos extends Model {}

export const CityPhotosModel = (sequelize: Sequelize) => {
  CityPhotos.init(
    {
      id: {
        type: DataTypes.STRING(255),
        primaryKey: true
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      full_url: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      reg_url: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      small_url: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      navigationUrl: {
        type: DataTypes.STRING(1024),
        allowNull: true
      },
      alt: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      blurHash: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      photographer: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      photographerUrl: {
        type: DataTypes.STRING(1024),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'CityPhotos',
      tableName: 'CityPhotos',
      timestamps: false
    }
  )
}

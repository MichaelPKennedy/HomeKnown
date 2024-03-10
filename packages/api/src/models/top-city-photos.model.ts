import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class TopCityPhotos extends Model {}

export const TopCityPhotosModel = (sequelize: Sequelize) => {
  TopCityPhotos.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      unsplash_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      full_url: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      blur_hash: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      alt_description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      photographer: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      profile_url: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      regular_url: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'TopCityPhotos',
      tableName: 'TopCityPhotos',
      timestamps: false
    }
  )
}

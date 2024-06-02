import { DataTypes, Model, Sequelize } from 'sequelize'

export class BlacklistPhotos extends Model {}

export const BlacklistPhotosModel = (sequelize: Sequelize) => {
  BlacklistPhotos.init(
    {
      id: {
        type: DataTypes.STRING(255),
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'BlacklistPhotos',
      tableName: 'BlacklistPhotos',
      timestamps: false
    }
  )
}

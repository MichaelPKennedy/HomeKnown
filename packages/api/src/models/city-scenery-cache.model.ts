import { DataTypes, Model, Sequelize } from 'sequelize'
import { City } from './city.model'

export class CitySceneryCache extends Model {}

type SceneryAttributes = {
  [key: string]: any
}

export const CitySceneryCacheModel = (sequelize: Sequelize) => {
  CitySceneryCache.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      city_id: {
        type: DataTypes.INTEGER,
        references: {
          model: City,
          key: 'city_id'
        }
      },
      ...(['forests', 'lakes_rivers', 'mountains', 'beaches'].reduce((acc: SceneryAttributes, type) => {
        for (let i = 10; i <= 50; i += 5) {
          acc[`${type}${i}`] = {
            type: DataTypes.INTEGER,
            defaultValue: 0
          }
        }
        return acc
      }, {}) as SceneryAttributes)
    },
    {
      sequelize,
      tableName: 'CitySceneryCache',
      timestamps: false,
      indexes: [
        {
          name: 'city_id',
          fields: ['city_id']
        }
      ]
    }
  )

  CitySceneryCache.belongsTo(City, { foreignKey: 'city_id' })
}

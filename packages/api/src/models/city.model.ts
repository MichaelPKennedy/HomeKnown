import { DataTypes, Model, Sequelize } from 'sequelize'
import { Area } from './area.model'
import { State } from './state.model'
import { PublicServiceCache } from './public-service-cache.model'

export class City extends Model {}

export const CityModel = (sequelize: Sequelize) => {
  City.init(
    {
      city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      city_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      area_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Area,
          key: 'area_code'
        }
      },
      Latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true
      },
      Longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true
      },
      currentHomePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      currentRentPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      pop_2020: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      pop_2021: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      pop_2022: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cost_index: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },
      state_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: State,
          key: 'state_code'
        }
      }
    },
    {
      sequelize,
      tableName: 'City',
      indexes: [
        {
          name: 'idx_city_area_code',
          fields: ['area_code']
        }
      ],
      timestamps: false
    }
  )
}

import { DataTypes, Model, Sequelize } from 'sequelize'
import { Area } from './area.model'

export class AirQuality extends Model {}

export const AirQualityModel = (sequelize: Sequelize) => {
  AirQuality.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      area_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Area,
          key: 'area_code'
        }
      },
      area_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      population_2010: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      CO_8hr_ppm: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      Pb_3mo_ug_m3: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      NO2_AM_ppb: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      NO2_1hr_ppb: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      O3_8hr_ppm: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      PM10_24hr_ug_m3: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      PM2_5_Wtd_AM_ug_m3: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      PM2_5_24hr_ug_m3: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      SO2_1hr_ppb: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'AirQuality',
      indexes: [
        {
          name: 'idx_airquality_area_code',
          fields: ['area_code']
        }
      ],
      timestamps: false
    }
  )
  AirQuality.belongsTo(Area, { foreignKey: 'area_code' })
}

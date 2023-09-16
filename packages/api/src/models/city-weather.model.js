module.exports = function (app) {
  const Sequelize = app.get('sequelize')
  const { Model, DataTypes } = Sequelize

  class CityWeather extends Model {}

  CityWeather.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      state: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      area_code: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Area',
          key: 'area_code'
        }
      },
      jan_high: DataTypes.DECIMAL(5, 2),
      feb_high: DataTypes.DECIMAL(5, 2),
      mar_high: DataTypes.DECIMAL(5, 2),
      apr_high: DataTypes.DECIMAL(5, 2),
      may_high: DataTypes.DECIMAL(5, 2),
      jun_high: DataTypes.DECIMAL(5, 2),
      jul_high: DataTypes.DECIMAL(5, 2),
      aug_high: DataTypes.DECIMAL(5, 2),
      sep_high: DataTypes.DECIMAL(5, 2),
      oct_high: DataTypes.DECIMAL(5, 2),
      nov_high: DataTypes.DECIMAL(5, 2),
      dec_high: DataTypes.DECIMAL(5, 2),
      jan_low: DataTypes.DECIMAL(5, 2),
      feb_low: DataTypes.DECIMAL(5, 2),
      mar_low: DataTypes.DECIMAL(5, 2),
      apr_low: DataTypes.DECIMAL(5, 2),
      may_low: DataTypes.DECIMAL(5, 2),
      jun_low: DataTypes.DECIMAL(5, 2),
      jul_low: DataTypes.DECIMAL(5, 2),
      aug_low: DataTypes.DECIMAL(5, 2),
      sep_low: DataTypes.DECIMAL(5, 2),
      oct_low: DataTypes.DECIMAL(5, 2),
      nov_low: DataTypes.DECIMAL(5, 2),
      dec_low: DataTypes.DECIMAL(5, 2),
      jan_prec: DataTypes.DECIMAL(5, 2),
      feb_prec: DataTypes.DECIMAL(5, 2),
      mar_prec: DataTypes.DECIMAL(5, 2),
      apr_prec: DataTypes.DECIMAL(5, 2),
      may_prec: DataTypes.DECIMAL(5, 2),
      jun_prec: DataTypes.DECIMAL(5, 2),
      jul_prec: DataTypes.DECIMAL(5, 2),
      aug_prec: DataTypes.DECIMAL(5, 2),
      sep_prec: DataTypes.DECIMAL(5, 2),
      oct_prec: DataTypes.DECIMAL(5, 2),
      nov_prec: DataTypes.DECIMAL(5, 2),
      dec_prec: DataTypes.DECIMAL(5, 2),
      jan_snow: DataTypes.DECIMAL(5, 2),
      feb_snow: DataTypes.DECIMAL(5, 2),
      mar_snow: DataTypes.DECIMAL(5, 2),
      apr_snow: DataTypes.DECIMAL(5, 2),
      may_snow: DataTypes.DECIMAL(5, 2),
      jun_snow: DataTypes.DECIMAL(5, 2),
      jul_snow: DataTypes.DECIMAL(5, 2),
      aug_snow: DataTypes.DECIMAL(5, 2),
      sep_snow: DataTypes.DECIMAL(5, 2),
      oct_snow: DataTypes.DECIMAL(5, 2),
      nov_snow: DataTypes.DECIMAL(5, 2),
      dec_snow: DataTypes.DECIMAL(5, 2)
    },
    {
      sequelize: app.get('sequelizeClient'),
      tableName: 'HomeKnown.CityWeather',
      timestamps: false
    }
  )

  return CityWeather
}

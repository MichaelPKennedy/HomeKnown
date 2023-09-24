module.exports = function (app) {
  const Sequelize = app.get('sequelize')
  const { Model, DataTypes } = Sequelize

  class Weather extends Model {}

  Weather.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      state_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'State',
          key: 'state_code'
        }
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      avgTemp: {
        type: DataTypes.DECIMAL(5, 2)
      }
    },
    {
      sequelize: app.get('sequelizeClient'),
      tableName: 'Weather',
      timestamps: false
    }
  )

  return Weather
}

module.exports = function (app) {
  const Sequelize = app.get('sequelize')
  const { Model, DataTypes } = Sequelize

  class State extends Model {}

  State.init(
    {
      state_code: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      state: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      state_abbr: {
        type: DataTypes.CHAR(2)
      }
    },
    {
      sequelize: app.get('sequelizeClient'),
      tableName: 'State',
      timestamps: false
    }
  )

  return State
}

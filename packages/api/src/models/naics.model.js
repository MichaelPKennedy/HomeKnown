module.exports = function (app) {
  const Sequelize = app.get('sequelize')
  const { Model, DataTypes } = Sequelize

  class NAICS extends Model {}

  NAICS.init(
    {
      naics_code: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      naics_title: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      sequelize: app.get('sequelizeClient'),
      tableName: 'NAICS',
      timestamps: false
    }
  )

  return NAICS
}

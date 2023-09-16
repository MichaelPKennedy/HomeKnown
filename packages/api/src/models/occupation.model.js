module.exports = function (app) {
  const Sequelize = app.get('sequelize')
  const { Model, DataTypes } = Sequelize

  class Occupation extends Model {}

  Occupation.init(
    {
      occ_code: {
        type: DataTypes.STRING(20),
        primaryKey: true
      },
      occ_title: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      sequelize: app.get('sequelizeClient'),
      tableName: 'Occupation',
      timestamps: false
    }
  )

  return Occupation
}

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.MonthlyRentCitiesModel = exports.MonthlyRentCities = void 0
const sequelize_1 = require('sequelize')
const city_model_1 = require('./city.model')
class MonthlyRentCities extends sequelize_1.Model {}
exports.MonthlyRentCities = MonthlyRentCities
const MonthlyRentCitiesModel = (sequelize) => {
  MonthlyRentCities.init(
    {
      id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      state_abbrev: {
        type: sequelize_1.DataTypes.STRING(2),
        allowNull: false
      },
      city_name: {
        type: sequelize_1.DataTypes.STRING(100),
        defaultValue: null
      },
      january_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2010: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2011: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2012: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2013: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2014: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2015: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2016: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2017: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2018: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2019: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2020: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2021: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2022: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      january_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      february_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      march_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      april_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      may_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      june_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      july_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      august_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      september_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      october_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      november_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      december_2023: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      county: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null
      },
      metro: {
        type: sequelize_1.DataTypes.STRING(500),
        defaultValue: null
      },
      city_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        references: {
          model: 'City',
          key: 'city_id'
        }
      }
    },
    {
      sequelize,
      tableName: 'MonthlyRentCities',
      timestamps: false
    }
  )
  MonthlyRentCities.belongsTo(city_model_1.City, { foreignKey: 'city_id' })
}
exports.MonthlyRentCitiesModel = MonthlyRentCitiesModel
//# sourceMappingURL=monthly-rent-cities.model.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrimeStatsModel = exports.CrimeStats = void 0;
const sequelize_1 = require("sequelize");
const county_model_1 = require("./county.model");
const state_model_1 = require("./state.model");
class CrimeStats extends sequelize_1.Model {
}
exports.CrimeStats = CrimeStats;
const CrimeStatsModel = (sequelize) => {
    CrimeStats.init({
        ID: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stcofips: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: county_model_1.County,
                key: 'county_fips'
            }
        },
        fips_st: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: state_model_1.State,
                key: 'state_code'
            }
        },
        fips_cty: {
            type: sequelize_1.DataTypes.INTEGER
        },
        year: {
            type: sequelize_1.DataTypes.STRING(4)
        },
        studyno: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        edition: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        part: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        idno: {
            type: sequelize_1.DataTypes.INTEGER
        },
        cpoparst: {
            type: sequelize_1.DataTypes.INTEGER
        },
        cpocrim: {
            type: sequelize_1.DataTypes.INTEGER
        },
        ag_arrst: {
            type: sequelize_1.DataTypes.INTEGER
        },
        ag_off: {
            type: sequelize_1.DataTypes.INTEGER
        },
        covind: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2)
        },
        total_crime: {
            type: sequelize_1.DataTypes.INTEGER
        },
        modindx: {
            type: sequelize_1.DataTypes.INTEGER
        },
        viol: {
            type: sequelize_1.DataTypes.INTEGER
        },
        property: {
            type: sequelize_1.DataTypes.INTEGER
        },
        murder: {
            type: sequelize_1.DataTypes.INTEGER
        },
        rape: {
            type: sequelize_1.DataTypes.INTEGER
        },
        robbery: {
            type: sequelize_1.DataTypes.INTEGER
        },
        agasslt: {
            type: sequelize_1.DataTypes.INTEGER
        },
        burglry: {
            type: sequelize_1.DataTypes.INTEGER
        },
        larceny: {
            type: sequelize_1.DataTypes.INTEGER
        },
        mvtheft: {
            type: sequelize_1.DataTypes.INTEGER
        },
        arson: {
            type: sequelize_1.DataTypes.INTEGER
        },
        crime_score: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2)
        }
    }, {
        sequelize,
        tableName: 'CrimeStats',
        timestamps: false,
        indexes: [
            {
                name: 'stcofips',
                fields: ['stcofips']
            },
            {
                name: 'fips_st',
                fields: ['fips_st']
            }
        ]
    });
    CrimeStats.belongsTo(county_model_1.County, { foreignKey: 'stcofips' });
    CrimeStats.belongsTo(state_model_1.State, { foreignKey: 'fips_st' });
};
exports.CrimeStatsModel = CrimeStatsModel;
//# sourceMappingURL=crime-stats.model.js.map
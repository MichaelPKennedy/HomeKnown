"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandMarkModel = exports.LandMark = void 0;
const sequelize_1 = require("sequelize");
const MTFCC_model_1 = require("./MTFCC.model");
class LandMark extends sequelize_1.Model {
}
exports.LandMark = LandMark;
const LandMarkModel = (sequelize) => {
    LandMark.init({
        X: {
            type: sequelize_1.DataTypes.DOUBLE
        },
        Y: {
            type: sequelize_1.DataTypes.DOUBLE
        },
        STATEFP: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        ANSICODE: {
            type: sequelize_1.DataTypes.INTEGER
        },
        POINTID: {
            type: sequelize_1.DataTypes.STRING(255),
            primaryKey: true
        },
        FULLNAME: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        MTFCC: {
            type: sequelize_1.DataTypes.STRING(10),
            allowNull: false,
            references: {
                model: MTFCC_model_1.MTFCC,
                key: 'MTFCC'
            }
        }
    }, {
        sequelize,
        tableName: 'LandMark',
        timestamps: false
    });
    LandMark.belongsTo(MTFCC_model_1.MTFCC, { foreignKey: 'MTFCC', as: 'MTFCCAssociation' });
    MTFCC_model_1.MTFCC.hasMany(LandMark, { foreignKey: 'MTFCC', as: 'LandMarks' });
};
exports.LandMarkModel = LandMarkModel;
//# sourceMappingURL=landmark.model.js.map
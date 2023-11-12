"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTFCCModel = exports.MTFCC = void 0;
const sequelize_1 = require("sequelize");
class MTFCC extends sequelize_1.Model {
}
exports.MTFCC = MTFCC;
const MTFCCModel = (sequelize) => {
    MTFCC.init({
        MTFCC: {
            type: sequelize_1.DataTypes.STRING(10),
            primaryKey: true
        },
        Feature_Class: {
            type: sequelize_1.DataTypes.STRING(500)
        },
        Superclass: {
            type: sequelize_1.DataTypes.STRING(500)
        }
    }, {
        sequelize,
        tableName: 'MTFCC',
        timestamps: false
    });
};
exports.MTFCCModel = MTFCCModel;
//# sourceMappingURL=MTFCC.model.js.map
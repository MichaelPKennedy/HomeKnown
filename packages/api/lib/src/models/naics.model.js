"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAICSModel = exports.NAICS = void 0;
const sequelize_1 = require("sequelize");
class NAICS extends sequelize_1.Model {
}
exports.NAICS = NAICS;
const NAICSModel = (sequelize) => {
    NAICS.init({
        naics_code: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true
        },
        naics_title: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'NAICS',
        timestamps: false
    });
};
exports.NAICSModel = NAICSModel;
//# sourceMappingURL=naics.model.js.map
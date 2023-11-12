"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OccupationModel = exports.Occupation = void 0;
const sequelize_1 = require("sequelize");
class Occupation extends sequelize_1.Model {
}
exports.Occupation = Occupation;
const OccupationModel = (sequelize) => {
    Occupation.init({
        occ_code: {
            type: sequelize_1.DataTypes.STRING(20),
            primaryKey: true
        },
        occ_title: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'Occupation',
        timestamps: false
    });
};
exports.OccupationModel = OccupationModel;
//# sourceMappingURL=occupation.model.js.map
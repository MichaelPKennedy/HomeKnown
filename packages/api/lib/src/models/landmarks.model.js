"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandMarkModel = exports.LandMark = void 0;
const sequelize_1 = require("sequelize");
class LandMark extends sequelize_1.Model {
}
exports.LandMark = LandMark;
const LandMarkModel = (sequelize) => {
    LandMark.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Location: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false
        },
        Type: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false
        },
        Latitude: {
            type: sequelize_1.DataTypes.DECIMAL(9, 6),
            allowNull: false
        },
        Longitude: {
            type: sequelize_1.DataTypes.DECIMAL(9, 6),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'LandMarks',
        timestamps: false
    });
};
exports.LandMarkModel = LandMarkModel;
//# sourceMappingURL=landmarks.model.js.map
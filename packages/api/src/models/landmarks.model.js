"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandMarksModel = exports.LandMarks = void 0;
const sequelize_1 = require("sequelize");
class LandMarks extends sequelize_1.Model {
}
exports.LandMarks = LandMarks;
const LandMarksModel = (sequelize) => {
    LandMarks.init({
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
exports.LandMarksModel = LandMarksModel;
//# sourceMappingURL=landmarks.model.js.map
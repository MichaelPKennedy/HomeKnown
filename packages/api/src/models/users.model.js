"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = exports.Users = void 0;
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
const UsersModel = (sequelize) => {
    Users.init({
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        primary_email: {
            type: sequelize_1.DataTypes.STRING(50),
            unique: true,
            defaultValue: null
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'Users',
        modelName: 'Users',
        timestamps: false,
        indexes: [
            {
                name: 'unique_username',
                unique: true,
                fields: ['username']
            },
            {
                name: 'unique_email',
                unique: true,
                fields: ['primary_email']
            }
        ]
    });
};
exports.UsersModel = UsersModel;
//# sourceMappingURL=users.model.js.map
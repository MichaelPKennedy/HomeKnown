"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_local_1 = require("@feathersjs/authentication-local");
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CustomStrategy extends authentication_local_1.LocalStrategy {
    constructor(app, sequelizeClient) {
        super();
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async findEntity(login, params) {
        const userModel = this.sequelize.models.Users;
        const user = await userModel.findOne({
            where: {
                [sequelize_1.Op.or]: [{ username: login }, { primary_email: login }]
            }
        });
        return user;
    }
    async verify(params, password, entity) {
        const isValid = await bcryptjs_1.default.compare(password, entity.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }
        return entity;
    }
    async getEntityQuery(query, params) {
        // Custom query adjustments if needed
        return query;
    }
    async getPayload(authResult, params) {
        const secretKey = process.env.SECRET_KEY || 'default_secret'; // Fallback secret key
        const accessToken = jsonwebtoken_1.default.sign({ userId: authResult.user.user_id }, secretKey, { expiresIn: '1d' });
        return { accessToken };
    }
}
exports.default = CustomStrategy;
//# sourceMappingURL=customStrategy.js.map
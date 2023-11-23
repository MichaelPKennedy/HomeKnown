"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process = require('process');
const { Op } = require('sequelize');
class UsersService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        throw new Error('Method not implemented.');
    }
    async get(id, params) {
        throw new Error('Method not implemented.');
    }
    async create(data, params) {
        const { username, password, primary_email } = data;
        // Hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create the new user
        const user = await this.sequelize.models.Users.create({
            username,
            password: hashedPassword,
            primary_email
        });
        // Return the new user without the password
        const { password: _, ...userWithoutPassword } = user.get({ plain: true });
        return userWithoutPassword;
    }
    // Custom method for login
    async login(data) {
        const { login, password } = data;
        const secretKey = process.env.SECRET_KEY || 'default_secret'; // Fallback secret key
        // Find the user by username or primary email
        const user = await this.sequelize.models.Users.findOne({
            where: {
                [Op.or]: [{ username: login }, { primary_email: login }]
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        // Check the password
        const isValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }
        // Create a JWT token
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.user_id }, secretKey, { expiresIn: '1d' });
        return { accessToken };
    }
    async update(id, data, params) {
        throw new Error('Method not implemented.');
    }
    async patch(id, data, params) {
        throw new Error('Method not implemented.');
    }
    async remove(id, params) {
        throw new Error('Method not implemented.');
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.class.js.map
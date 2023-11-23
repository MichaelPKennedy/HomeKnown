"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const users_class_1 = require("./users.class");
const users_shared_1 = require("./users.shared");
const users_hooks_1 = require("./users.hooks");
const users = (app) => {
    const sequelizeClient = app.get('sequelizeClient');
    const usersService = new users_class_1.UsersService(app, sequelizeClient);
    app.use(users_shared_1.usersPath, usersService);
    // Initialize hooks
    app.service(users_shared_1.usersPath).hooks(users_hooks_1.usersHooks);
    // custom login endpoint
    app.post('/login', async (req, res, next) => {
        try {
            const accessToken = await usersService.login(req.body);
            res.json(accessToken);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    });
};
exports.users = users;
//# sourceMappingURL=users.js.map
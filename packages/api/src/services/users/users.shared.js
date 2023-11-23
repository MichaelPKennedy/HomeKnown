"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersClient = exports.usersMethods = exports.usersPath = void 0;
exports.usersPath = 'users';
exports.usersMethods = ['find', 'get', 'create', 'patch', 'remove'];
const usersClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.usersPath, connection.service(exports.usersPath), {
        methods: exports.usersMethods
    });
};
exports.usersClient = usersClient;
//# sourceMappingURL=users.shared.js.map
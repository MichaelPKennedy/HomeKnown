"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recreationClient = exports.recreationMethods = exports.recreationPath = void 0;
exports.recreationPath = 'recreation';
exports.recreationMethods = ['find', 'get', 'create', 'patch', 'remove'];
const recreationClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.recreationPath, connection.service(exports.recreationPath), {
        methods: exports.recreationMethods
    });
};
exports.recreationClient = recreationClient;
//# sourceMappingURL=recreation.shared.js.map
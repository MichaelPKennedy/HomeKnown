"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.occupationClient = exports.occupationMethods = exports.occupationPath = void 0;
exports.occupationPath = '/occupation';
exports.occupationMethods = ['find', 'get', 'create', 'patch', 'remove'];
const occupationClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.occupationPath, connection.service(exports.occupationPath), {
        methods: exports.occupationMethods
    });
};
exports.occupationClient = occupationClient;
//# sourceMappingURL=occupation.shared.js.map
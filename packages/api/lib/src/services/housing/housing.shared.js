"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.housingClient = exports.housingMethods = exports.housingPath = void 0;
exports.housingPath = 'housing';
exports.housingMethods = ['find', 'get', 'create', 'patch', 'remove'];
const housingClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.housingPath, connection.service(exports.housingPath), {
        methods: exports.housingMethods
    });
};
exports.housingClient = housingClient;
//# sourceMappingURL=housing.shared.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicServicesClient = exports.publicServicesMethods = exports.publicServicesPath = void 0;
exports.publicServicesPath = 'public-services';
exports.publicServicesMethods = ['find', 'get', 'create', 'patch', 'remove'];
const publicServicesClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.publicServicesPath, connection.service(exports.publicServicesPath), {
        methods: exports.publicServicesMethods
    });
};
exports.publicServicesClient = publicServicesClient;
//# sourceMappingURL=public-services.shared.js.map
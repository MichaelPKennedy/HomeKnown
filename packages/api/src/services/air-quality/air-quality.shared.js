"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airQualityClient = exports.airQualityMethods = exports.airQualityPath = void 0;
exports.airQualityPath = 'air-quality';
exports.airQualityMethods = ['find', 'get', 'create', 'patch', 'remove'];
const airQualityClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.airQualityPath, connection.service(exports.airQualityPath), {
        methods: exports.airQualityMethods
    });
};
exports.airQualityClient = airQualityClient;
//# sourceMappingURL=air-quality.shared.js.map
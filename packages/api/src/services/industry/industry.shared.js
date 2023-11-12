"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.industryClient = exports.industryMethods = exports.industryPath = void 0;
exports.industryPath = 'industry';
exports.industryMethods = ['find', 'get', 'create', 'patch', 'remove'];
const industryClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.industryPath, connection.service(exports.industryPath), {
        methods: exports.industryMethods
    });
};
exports.industryClient = industryClient;
//# sourceMappingURL=industry.shared.js.map
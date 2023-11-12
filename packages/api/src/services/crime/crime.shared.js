"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crimeClient = exports.crimeMethods = exports.crimePath = void 0;
exports.crimePath = 'crime';
exports.crimeMethods = ['find', 'get', 'create', 'patch', 'remove'];
const crimeClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.crimePath, connection.service(exports.crimePath), {
        methods: exports.crimeMethods
    });
};
exports.crimeClient = crimeClient;
//# sourceMappingURL=crime.shared.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherClient = exports.weatherMethods = exports.weatherPath = void 0;
exports.weatherPath = 'weather';
exports.weatherMethods = ['find', 'get', 'create', 'patch', 'remove'];
const weatherClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.weatherPath, connection.service(exports.weatherPath), {
        methods: exports.weatherMethods
    });
};
exports.weatherClient = weatherClient;
//# sourceMappingURL=weather.shared.js.map
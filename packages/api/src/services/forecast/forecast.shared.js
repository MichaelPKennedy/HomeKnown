"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastClient = exports.forecastMethods = exports.forecastPath = void 0;
exports.forecastPath = 'forecast';
exports.forecastMethods = ['find', 'get', 'create', 'patch', 'remove'];
const forecastClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.forecastPath, connection.service(exports.forecastPath), {
        methods: exports.forecastMethods
    });
};
exports.forecastClient = forecastClient;
//# sourceMappingURL=forecast.shared.js.map
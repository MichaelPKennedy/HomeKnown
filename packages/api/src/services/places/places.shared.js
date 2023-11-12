"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesClient = exports.placesMethods = exports.placesPath = void 0;
exports.placesPath = '/places';
exports.placesMethods = ['find', 'get', 'create', 'patch', 'remove'];
const placesClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.placesPath, connection.service(exports.placesPath), {
        methods: exports.placesMethods
    });
};
exports.placesClient = placesClient;
//# sourceMappingURL=places.shared.js.map
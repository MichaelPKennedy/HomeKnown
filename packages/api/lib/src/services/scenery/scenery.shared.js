"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sceneryClient = exports.sceneryMethods = exports.sceneryPath = void 0;
exports.sceneryPath = 'scenery';
exports.sceneryMethods = ['find', 'get', 'create', 'patch', 'remove'];
const sceneryClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.sceneryPath, connection.service(exports.sceneryPath), {
        methods: exports.sceneryMethods
    });
};
exports.sceneryClient = sceneryClient;
//# sourceMappingURL=scenery.shared.js.map
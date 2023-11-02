"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicServicesHooks = void 0;
const { disallow } = require('feathers-hooks-common');
exports.publicServicesHooks = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [disallow('external')],
        update: [disallow('external')],
        patch: [disallow('external')],
        remove: [disallow('external')]
    },
    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },
    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
//# sourceMappingURL=public-services.hooks.js.map
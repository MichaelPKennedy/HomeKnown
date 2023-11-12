"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recreationHooks = void 0;
const { disallow } = require('feathers-hooks-common');
exports.recreationHooks = {
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
//# sourceMappingURL=recreation.hooks.js.map
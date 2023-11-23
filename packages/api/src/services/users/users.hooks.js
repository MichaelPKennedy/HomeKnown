"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersHooks = void 0;
const { disallow } = require('feathers-hooks-common');
exports.usersHooks = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
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
//# sourceMappingURL=users.hooks.js.map
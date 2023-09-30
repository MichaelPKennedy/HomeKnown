"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyHooks = void 0;
const { disallow } = require('feathers-hooks-common');
exports.surveyHooks = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
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
//# sourceMappingURL=survey.hooks.js.map
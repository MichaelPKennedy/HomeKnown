"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyHooks = void 0;
const { disallow } = require('feathers-hooks-common');
const get_city_photos_1 = __importDefault(require("./hooks/get-city-photos"));
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
        create: [get_city_photos_1.default],
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
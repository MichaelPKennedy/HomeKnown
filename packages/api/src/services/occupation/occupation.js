"use strict";
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.occupation = void 0;
const occupation_class_1 = require("./occupation.class");
const occupation_shared_1 = require("./occupation.shared");
const occupation_hooks_1 = require("./occupation.hooks");
__exportStar(require("./occupation.class"), exports);
__exportStar(require("./occupation.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const occupation = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(occupation_shared_1.occupationPath, new occupation_class_1.OccupationService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: occupation_shared_1.occupationMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(occupation_shared_1.occupationPath).hooks(occupation_hooks_1.occupationHooks);
};
exports.occupation = occupation;
//# sourceMappingURL=occupation.js.map
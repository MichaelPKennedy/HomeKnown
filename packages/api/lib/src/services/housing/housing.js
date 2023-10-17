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
exports.housing = void 0;
const housing_class_1 = require("./housing.class");
const housing_shared_1 = require("./housing.shared");
const housing_hooks_1 = require("./housing.hooks");
__exportStar(require("./housing.class"), exports);
__exportStar(require("./housing.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const housing = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(housing_shared_1.housingPath, new housing_class_1.HousingService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: housing_shared_1.housingMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(housing_shared_1.housingPath).hooks(housing_hooks_1.housingHooks);
};
exports.housing = housing;
//# sourceMappingURL=housing.js.map
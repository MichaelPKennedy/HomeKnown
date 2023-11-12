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
exports.airQuality = void 0;
const air_quality_class_1 = require("./air-quality.class");
const air_quality_shared_1 = require("./air-quality.shared");
const air_quality_hooks_1 = require("./air-quality.hooks");
__exportStar(require("./air-quality.class"), exports);
__exportStar(require("./air-quality.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const airQuality = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(air_quality_shared_1.airQualityPath, new air_quality_class_1.AirQualityService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: air_quality_shared_1.airQualityMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(air_quality_shared_1.airQualityPath).hooks(air_quality_hooks_1.airQualityHooks);
};
exports.airQuality = airQuality;
//# sourceMappingURL=air-quality.js.map
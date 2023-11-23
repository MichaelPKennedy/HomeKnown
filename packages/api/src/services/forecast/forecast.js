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
exports.forecast = void 0;
const forecast_class_1 = require("./forecast.class");
const forecast_shared_1 = require("./forecast.shared");
const forecast_hooks_1 = require("./forecast.hooks");
__exportStar(require("./forecast.class"), exports);
__exportStar(require("./forecast.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const forecast = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(forecast_shared_1.forecastPath, new forecast_class_1.ForecastService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: forecast_shared_1.forecastMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(forecast_shared_1.forecastPath).hooks(forecast_hooks_1.forecastHooks);
};
exports.forecast = forecast;
//# sourceMappingURL=forecast.js.map
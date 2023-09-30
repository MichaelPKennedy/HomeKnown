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
exports.weather = void 0;
const schema_1 = require("@feathersjs/schema");
const weather_schema_1 = require("./weather.schema");
const weather_class_1 = require("./weather.class");
const weather_shared_1 = require("./weather.shared");
__exportStar(require("./weather.class"), exports);
__exportStar(require("./weather.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const weather = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(weather_shared_1.weatherPath, new weather_class_1.WeatherService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: weather_shared_1.weatherMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(weather_shared_1.weatherPath).hooks({
        around: {
            all: [schema_1.hooks.resolveExternal(weather_schema_1.weatherExternalResolver), schema_1.hooks.resolveResult(weather_schema_1.weatherResolver)]
        },
        before: {
            all: [schema_1.hooks.validateQuery(weather_schema_1.weatherQueryValidator), schema_1.hooks.resolveQuery(weather_schema_1.weatherQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(weather_schema_1.weatherDataValidator), schema_1.hooks.resolveData(weather_schema_1.weatherDataResolver)],
            patch: [schema_1.hooks.validateData(weather_schema_1.weatherPatchValidator), schema_1.hooks.resolveData(weather_schema_1.weatherPatchResolver)],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    });
};
exports.weather = weather;
//# sourceMappingURL=weather.js.map
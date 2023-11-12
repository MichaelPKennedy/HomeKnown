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
exports.crime = void 0;
const crime_class_1 = require("./crime.class");
const crime_shared_1 = require("./crime.shared");
const crime_hooks_1 = require("./crime.hooks");
__exportStar(require("./crime.class"), exports);
__exportStar(require("./crime.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const crime = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(crime_shared_1.crimePath, new crime_class_1.CrimeService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: crime_shared_1.crimeMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(crime_shared_1.crimePath).hooks(crime_hooks_1.crimeHooks);
};
exports.crime = crime;
//# sourceMappingURL=crime.js.map
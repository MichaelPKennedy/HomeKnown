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
exports.industry = void 0;
const industry_class_1 = require("./industry.class");
const industry_shared_1 = require("./industry.shared");
const industry_hooks_1 = require("./industry.hooks");
__exportStar(require("./industry.class"), exports);
__exportStar(require("./industry.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const industry = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(industry_shared_1.industryPath, new industry_class_1.IndustryService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: industry_shared_1.industryMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(industry_shared_1.industryPath).hooks(industry_hooks_1.industryHooks);
};
exports.industry = industry;
//# sourceMappingURL=industry.js.map
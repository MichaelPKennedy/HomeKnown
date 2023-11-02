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
exports.publicServices = void 0;
const public_services_class_1 = require("./public-services.class");
const public_services_shared_1 = require("./public-services.shared");
const public_services_hooks_1 = require("./public-services.hooks");
__exportStar(require("./public-services.class"), exports);
__exportStar(require("./public-services.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const publicServices = (app) => {
    // Register our service on the Feathers application
    const sequelizeClient = app.get('sequelizeClient');
    app.use(public_services_shared_1.publicServicesPath, new public_services_class_1.PublicServicesService(app, sequelizeClient), {
        // A list of all methods this service exposes externally
        methods: public_services_shared_1.publicServicesMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(public_services_shared_1.publicServicesPath).hooks(public_services_hooks_1.publicServicesHooks);
};
exports.publicServices = publicServices;
//# sourceMappingURL=public-services.js.map
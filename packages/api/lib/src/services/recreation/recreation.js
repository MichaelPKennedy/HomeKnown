"use strict";
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
exports.recreation = void 0;
const recreation_class_1 = require("./recreation.class");
const recreation_shared_1 = require("./recreation.shared");
const recreation_hooks_1 = require("./recreation.hooks");
__exportStar(require("./recreation.class"), exports);
__exportStar(require("./recreation.schema"), exports);
const recreation = (app) => {
    const sequelizeClient = app.get('sequelizeClient');
    app.use(recreation_shared_1.recreationPath, new recreation_class_1.RecreationService(app, sequelizeClient), {
        methods: recreation_shared_1.recreationMethods,
        events: []
    });
    app.service(recreation_shared_1.recreationPath).hooks(recreation_hooks_1.recreationHooks);
};
exports.recreation = recreation;
//# sourceMappingURL=recreation.js.map
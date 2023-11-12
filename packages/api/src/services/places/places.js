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
exports.places = void 0;
const places_class_1 = require("./places.class");
const places_shared_1 = require("./places.shared");
const places_hooks_1 = require("./places.hooks");
__exportStar(require("./places.class"), exports);
__exportStar(require("./places.schema"), exports);
const places = (app) => {
    app.use(places_shared_1.placesPath, new places_class_1.PlacesService(app), {
        methods: places_shared_1.placesMethods,
        events: []
    });
    app.service(places_shared_1.placesPath).hooks(places_hooks_1.placesHooks);
};
exports.places = places;
//# sourceMappingURL=places.js.map
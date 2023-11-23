"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastQueryResolver = exports.forecastQueryValidator = exports.forecastQuerySchema = exports.forecastQueryProperties = exports.forecastPatchResolver = exports.forecastPatchValidator = exports.forecastPatchSchema = exports.forecastDataResolver = exports.forecastDataValidator = exports.forecastDataSchema = exports.forecastExternalResolver = exports.forecastResolver = exports.forecastValidator = exports.forecastSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.forecastSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Forecast', additionalProperties: false });
exports.forecastValidator = (0, typebox_1.getValidator)(exports.forecastSchema, validators_1.dataValidator);
exports.forecastResolver = (0, schema_1.resolve)({});
exports.forecastExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.forecastDataSchema = typebox_1.Type.Pick(exports.forecastSchema, ['text'], {
    $id: 'ForecastData'
});
exports.forecastDataValidator = (0, typebox_1.getValidator)(exports.forecastDataSchema, validators_1.dataValidator);
exports.forecastDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.forecastPatchSchema = typebox_1.Type.Partial(exports.forecastSchema, {
    $id: 'ForecastPatch'
});
exports.forecastPatchValidator = (0, typebox_1.getValidator)(exports.forecastPatchSchema, validators_1.dataValidator);
exports.forecastPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.forecastQueryProperties = typebox_1.Type.Pick(exports.forecastSchema, ['id', 'text']);
exports.forecastQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.forecastQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.forecastQueryValidator = (0, typebox_1.getValidator)(exports.forecastQuerySchema, validators_1.queryValidator);
exports.forecastQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=forecast.schema.js.map
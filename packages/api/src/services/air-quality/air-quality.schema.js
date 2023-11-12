"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airQualityQueryResolver = exports.airQualityQueryValidator = exports.airQualityQuerySchema = exports.airQualityQueryProperties = exports.airQualityPatchResolver = exports.airQualityPatchValidator = exports.airQualityPatchSchema = exports.airQualityDataResolver = exports.airQualityDataValidator = exports.airQualityDataSchema = exports.airQualityExternalResolver = exports.airQualityResolver = exports.airQualityValidator = exports.airQualitySchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.airQualitySchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'AirQuality', additionalProperties: false });
exports.airQualityValidator = (0, typebox_1.getValidator)(exports.airQualitySchema, validators_1.dataValidator);
exports.airQualityResolver = (0, schema_1.resolve)({});
exports.airQualityExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.airQualityDataSchema = typebox_1.Type.Pick(exports.airQualitySchema, ['text'], {
    $id: 'AirQualityData'
});
exports.airQualityDataValidator = (0, typebox_1.getValidator)(exports.airQualityDataSchema, validators_1.dataValidator);
exports.airQualityDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.airQualityPatchSchema = typebox_1.Type.Partial(exports.airQualitySchema, {
    $id: 'AirQualityPatch'
});
exports.airQualityPatchValidator = (0, typebox_1.getValidator)(exports.airQualityPatchSchema, validators_1.dataValidator);
exports.airQualityPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.airQualityQueryProperties = typebox_1.Type.Pick(exports.airQualitySchema, ['id', 'text']);
exports.airQualityQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.airQualityQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.airQualityQueryValidator = (0, typebox_1.getValidator)(exports.airQualityQuerySchema, validators_1.queryValidator);
exports.airQualityQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=air-quality.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherQueryResolver = exports.weatherQueryValidator = exports.weatherQuerySchema = exports.weatherAdditionalQueryProperties = exports.weatherQueryProperties = exports.weatherPatchResolver = exports.weatherPatchValidator = exports.weatherPatchSchema = exports.weatherDataResolver = exports.weatherDataValidator = exports.weatherDataSchema = exports.weatherExternalResolver = exports.weatherResolver = exports.weatherValidator = exports.weatherSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.weatherSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Weather', additionalProperties: false });
exports.weatherValidator = (0, typebox_1.getValidator)(exports.weatherSchema, validators_1.dataValidator);
exports.weatherResolver = (0, schema_1.resolve)({});
exports.weatherExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.weatherDataSchema = typebox_1.Type.Pick(exports.weatherSchema, ['text'], {
    $id: 'WeatherData'
});
exports.weatherDataValidator = (0, typebox_1.getValidator)(exports.weatherDataSchema, validators_1.dataValidator);
exports.weatherDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.weatherPatchSchema = typebox_1.Type.Partial(exports.weatherSchema, {
    $id: 'WeatherPatch'
});
exports.weatherPatchValidator = (0, typebox_1.getValidator)(exports.weatherPatchSchema, validators_1.dataValidator);
exports.weatherPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
// Schema for allowed query properties
exports.weatherQueryProperties = typebox_1.Type.Pick(exports.weatherSchema, ['id', 'text'], {
    $id: 'WeatherQueryProperties'
});
exports.weatherAdditionalQueryProperties = typebox_1.Type.Object({
    snowPreference: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('none'), typebox_1.Type.Literal('light'), typebox_1.Type.Literal('heavy')])),
    rainPreference: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('dry'), typebox_1.Type.Literal('regular')])),
    temperatureData: typebox_1.Type.Array(typebox_1.Type.Object({
        month: typebox_1.Type.String(),
        temp: typebox_1.Type.Optional(typebox_1.Type.Number())
    }), { minItems: 12, maxItems: 12 })
}, { additionalProperties: false });
exports.weatherQuerySchema = typebox_1.Type.Intersect([(0, typebox_1.querySyntax)(exports.weatherQueryProperties), exports.weatherAdditionalQueryProperties], { additionalProperties: false });
exports.weatherQueryValidator = (0, typebox_1.getValidator)(exports.weatherQuerySchema, validators_1.queryValidator);
exports.weatherQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=weather.schema.js.map
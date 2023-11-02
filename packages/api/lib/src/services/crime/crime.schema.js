"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crimeQueryResolver = exports.crimeQueryValidator = exports.crimeQuerySchema = exports.crimeQueryProperties = exports.crimePatchResolver = exports.crimePatchValidator = exports.crimePatchSchema = exports.crimeDataResolver = exports.crimeDataValidator = exports.crimeDataSchema = exports.crimeExternalResolver = exports.crimeResolver = exports.crimeValidator = exports.crimeSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.crimeSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Crime', additionalProperties: false });
exports.crimeValidator = (0, typebox_1.getValidator)(exports.crimeSchema, validators_1.dataValidator);
exports.crimeResolver = (0, schema_1.resolve)({});
exports.crimeExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.crimeDataSchema = typebox_1.Type.Pick(exports.crimeSchema, ['text'], {
    $id: 'CrimeData'
});
exports.crimeDataValidator = (0, typebox_1.getValidator)(exports.crimeDataSchema, validators_1.dataValidator);
exports.crimeDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.crimePatchSchema = typebox_1.Type.Partial(exports.crimeSchema, {
    $id: 'CrimePatch'
});
exports.crimePatchValidator = (0, typebox_1.getValidator)(exports.crimePatchSchema, validators_1.dataValidator);
exports.crimePatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.crimeQueryProperties = typebox_1.Type.Pick(exports.crimeSchema, ['id', 'text']);
exports.crimeQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.crimeQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.crimeQueryValidator = (0, typebox_1.getValidator)(exports.crimeQuerySchema, validators_1.queryValidator);
exports.crimeQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=crime.schema.js.map
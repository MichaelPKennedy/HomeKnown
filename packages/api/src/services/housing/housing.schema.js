"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.housingQueryResolver = exports.housingQueryValidator = exports.housingQuerySchema = exports.housingQueryProperties = exports.housingPatchResolver = exports.housingPatchValidator = exports.housingPatchSchema = exports.housingDataResolver = exports.housingDataValidator = exports.housingDataSchema = exports.housingExternalResolver = exports.housingResolver = exports.housingValidator = exports.housingSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.housingSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Housing', additionalProperties: false });
exports.housingValidator = (0, typebox_1.getValidator)(exports.housingSchema, validators_1.dataValidator);
exports.housingResolver = (0, schema_1.resolve)({});
exports.housingExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.housingDataSchema = typebox_1.Type.Pick(exports.housingSchema, ['text'], {
    $id: 'HousingData'
});
exports.housingDataValidator = (0, typebox_1.getValidator)(exports.housingDataSchema, validators_1.dataValidator);
exports.housingDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.housingPatchSchema = typebox_1.Type.Partial(exports.housingSchema, {
    $id: 'HousingPatch'
});
exports.housingPatchValidator = (0, typebox_1.getValidator)(exports.housingPatchSchema, validators_1.dataValidator);
exports.housingPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.housingQueryProperties = typebox_1.Type.Pick(exports.housingSchema, ['id', 'text']);
exports.housingQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.housingQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.housingQueryValidator = (0, typebox_1.getValidator)(exports.housingQuerySchema, validators_1.queryValidator);
exports.housingQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=housing.schema.js.map
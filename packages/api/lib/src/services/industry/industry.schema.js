"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.industryQueryResolver = exports.industryQueryValidator = exports.industryQuerySchema = exports.industryQueryProperties = exports.industryPatchResolver = exports.industryPatchValidator = exports.industryPatchSchema = exports.industryDataResolver = exports.industryDataValidator = exports.industryDataSchema = exports.industryExternalResolver = exports.industryResolver = exports.industryValidator = exports.industrySchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.industrySchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Industry', additionalProperties: false });
exports.industryValidator = (0, typebox_1.getValidator)(exports.industrySchema, validators_1.dataValidator);
exports.industryResolver = (0, schema_1.resolve)({});
exports.industryExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.industryDataSchema = typebox_1.Type.Pick(exports.industrySchema, ['text'], {
    $id: 'IndustryData'
});
exports.industryDataValidator = (0, typebox_1.getValidator)(exports.industryDataSchema, validators_1.dataValidator);
exports.industryDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.industryPatchSchema = typebox_1.Type.Partial(exports.industrySchema, {
    $id: 'IndustryPatch'
});
exports.industryPatchValidator = (0, typebox_1.getValidator)(exports.industryPatchSchema, validators_1.dataValidator);
exports.industryPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.industryQueryProperties = typebox_1.Type.Pick(exports.industrySchema, ['id', 'text']);
exports.industryQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.industryQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.industryQueryValidator = (0, typebox_1.getValidator)(exports.industryQuerySchema, validators_1.queryValidator);
exports.industryQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=industry.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.occupationQueryResolver = exports.occupationQueryValidator = exports.occupationQuerySchema = exports.occupationQueryProperties = exports.occupationPatchResolver = exports.occupationPatchValidator = exports.occupationPatchSchema = exports.occupationDataResolver = exports.occupationDataValidator = exports.occupationDataSchema = exports.occupationExternalResolver = exports.occupationResolver = exports.occupationValidator = exports.occupationSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.occupationSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Occupation', additionalProperties: false });
exports.occupationValidator = (0, typebox_1.getValidator)(exports.occupationSchema, validators_1.dataValidator);
exports.occupationResolver = (0, schema_1.resolve)({});
exports.occupationExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.occupationDataSchema = typebox_1.Type.Pick(exports.occupationSchema, ['text'], {
    $id: 'OccupationData'
});
exports.occupationDataValidator = (0, typebox_1.getValidator)(exports.occupationDataSchema, validators_1.dataValidator);
exports.occupationDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.occupationPatchSchema = typebox_1.Type.Partial(exports.occupationSchema, {
    $id: 'OccupationPatch'
});
exports.occupationPatchValidator = (0, typebox_1.getValidator)(exports.occupationPatchSchema, validators_1.dataValidator);
exports.occupationPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.occupationQueryProperties = typebox_1.Type.Pick(exports.occupationSchema, ['id', 'text']);
exports.occupationQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.occupationQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.occupationQueryValidator = (0, typebox_1.getValidator)(exports.occupationQuerySchema, validators_1.queryValidator);
exports.occupationQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=occupation.schema.js.map
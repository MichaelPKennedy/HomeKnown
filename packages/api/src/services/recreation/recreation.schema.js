"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recreationQueryResolver = exports.recreationQueryValidator = exports.recreationQuerySchema = exports.recreationQueryProperties = exports.recreationPatchResolver = exports.recreationPatchValidator = exports.recreationPatchSchema = exports.recreationDataResolver = exports.recreationDataValidator = exports.recreationDataSchema = exports.recreationExternalResolver = exports.recreationResolver = exports.recreationValidator = exports.recreationSchema = void 0;
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
const schema_1 = require("@feathersjs/schema");
// Main data model schema
exports.recreationSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Recreation', additionalProperties: true });
exports.recreationValidator = (0, typebox_1.getValidator)(exports.recreationSchema, validators_1.dataValidator);
exports.recreationResolver = (0, schema_1.resolve)({});
exports.recreationExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.recreationDataSchema = typebox_1.Type.Pick(exports.recreationSchema, ['text'], {
    $id: 'RecreationData'
});
exports.recreationDataValidator = (0, typebox_1.getValidator)(exports.recreationDataSchema, validators_1.dataValidator);
exports.recreationDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.recreationPatchSchema = typebox_1.Type.Partial(exports.recreationSchema, {
    $id: 'RecreationPatch'
});
exports.recreationPatchValidator = (0, typebox_1.getValidator)(exports.recreationPatchSchema, validators_1.dataValidator);
exports.recreationPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.recreationQueryProperties = typebox_1.Type.Pick(exports.recreationSchema, ['id', 'text']);
exports.recreationQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.recreationQueryProperties),
    typebox_1.Type.Object({
        recreationalInterests: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String()))
    }, { additionalProperties: true })
], { additionalProperties: true });
exports.recreationQueryValidator = (0, typebox_1.getValidator)(exports.recreationQuerySchema, validators_1.queryValidator);
exports.recreationQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=recreation.schema.js.map
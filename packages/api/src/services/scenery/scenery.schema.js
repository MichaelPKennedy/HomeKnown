"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sceneryQueryResolver = exports.sceneryQueryValidator = exports.sceneryQuerySchema = exports.sceneryQueryProperties = exports.sceneryPatchResolver = exports.sceneryPatchValidator = exports.sceneryPatchSchema = exports.sceneryDataResolver = exports.sceneryDataValidator = exports.sceneryDataSchema = exports.sceneryExternalResolver = exports.sceneryResolver = exports.sceneryValidator = exports.scenerySchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.scenerySchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Scenery', additionalProperties: false });
exports.sceneryValidator = (0, typebox_1.getValidator)(exports.scenerySchema, validators_1.dataValidator);
exports.sceneryResolver = (0, schema_1.resolve)({});
exports.sceneryExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.sceneryDataSchema = typebox_1.Type.Pick(exports.scenerySchema, ['text'], {
    $id: 'SceneryData'
});
exports.sceneryDataValidator = (0, typebox_1.getValidator)(exports.sceneryDataSchema, validators_1.dataValidator);
exports.sceneryDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.sceneryPatchSchema = typebox_1.Type.Partial(exports.scenerySchema, {
    $id: 'SceneryPatch'
});
exports.sceneryPatchValidator = (0, typebox_1.getValidator)(exports.sceneryPatchSchema, validators_1.dataValidator);
exports.sceneryPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.sceneryQueryProperties = typebox_1.Type.Pick(exports.scenerySchema, ['id', 'text']);
exports.sceneryQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.sceneryQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.sceneryQueryValidator = (0, typebox_1.getValidator)(exports.sceneryQuerySchema, validators_1.queryValidator);
exports.sceneryQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=scenery.schema.js.map
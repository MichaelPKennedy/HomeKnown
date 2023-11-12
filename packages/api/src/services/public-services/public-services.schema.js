"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicServicesQueryResolver = exports.publicServicesQueryValidator = exports.publicServicesQuerySchema = exports.publicServicesQueryProperties = exports.publicServicesPatchResolver = exports.publicServicesPatchValidator = exports.publicServicesPatchSchema = exports.publicServicesDataResolver = exports.publicServicesDataValidator = exports.publicServicesDataSchema = exports.publicServicesExternalResolver = exports.publicServicesResolver = exports.publicServicesValidator = exports.publicServicesSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.publicServicesSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'PublicServices', additionalProperties: false });
exports.publicServicesValidator = (0, typebox_1.getValidator)(exports.publicServicesSchema, validators_1.dataValidator);
exports.publicServicesResolver = (0, schema_1.resolve)({});
exports.publicServicesExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.publicServicesDataSchema = typebox_1.Type.Pick(exports.publicServicesSchema, ['text'], {
    $id: 'PublicServicesData'
});
exports.publicServicesDataValidator = (0, typebox_1.getValidator)(exports.publicServicesDataSchema, validators_1.dataValidator);
exports.publicServicesDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.publicServicesPatchSchema = typebox_1.Type.Partial(exports.publicServicesSchema, {
    $id: 'PublicServicesPatch'
});
exports.publicServicesPatchValidator = (0, typebox_1.getValidator)(exports.publicServicesPatchSchema, validators_1.dataValidator);
exports.publicServicesPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.publicServicesQueryProperties = typebox_1.Type.Pick(exports.publicServicesSchema, ['id', 'text']);
exports.publicServicesQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.publicServicesQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.publicServicesQueryValidator = (0, typebox_1.getValidator)(exports.publicServicesQuerySchema, validators_1.queryValidator);
exports.publicServicesQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=public-services.schema.js.map
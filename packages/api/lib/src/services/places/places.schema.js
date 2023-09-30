"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesQueryResolver = exports.placesQueryValidator = exports.placesQuerySchema = exports.placesQueryProperties = exports.placesPatchResolver = exports.placesPatchValidator = exports.placesPatchSchema = exports.placesDataResolver = exports.placesDataValidator = exports.placesDataSchema = exports.placesExternalResolver = exports.placesResolver = exports.placesValidator = exports.placesSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.placesSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String(),
    query: typebox_1.Type.String()
}, { $id: 'Places', additionalProperties: false });
exports.placesValidator = (0, typebox_1.getValidator)(exports.placesSchema, validators_1.dataValidator);
exports.placesResolver = (0, schema_1.resolve)({});
exports.placesExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.placesDataSchema = typebox_1.Type.Pick(exports.placesSchema, ['text'], {
    $id: 'PlacesData'
});
exports.placesDataValidator = (0, typebox_1.getValidator)(exports.placesDataSchema, validators_1.dataValidator);
exports.placesDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.placesPatchSchema = typebox_1.Type.Partial(exports.placesSchema, {
    $id: 'PlacesPatch'
});
exports.placesPatchValidator = (0, typebox_1.getValidator)(exports.placesPatchSchema, validators_1.dataValidator);
exports.placesPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.placesQueryProperties = typebox_1.Type.Pick(exports.placesSchema, ['id', 'text', 'query']);
exports.placesQuerySchema = typebox_1.Type.Intersect([(0, typebox_1.querySyntax)(exports.placesQueryProperties), typebox_1.Type.Object({}, { additionalProperties: false })], { additionalProperties: false });
exports.placesQueryValidator = (0, typebox_1.getValidator)(exports.placesQuerySchema, validators_1.queryValidator);
exports.placesQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=places.schema.js.map
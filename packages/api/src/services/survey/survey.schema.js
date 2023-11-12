"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyQueryResolver = exports.surveyQueryValidator = exports.surveyQuerySchema = exports.surveyQueryProperties = exports.surveyPatchResolver = exports.surveyPatchValidator = exports.surveyPatchSchema = exports.surveyDataResolver = exports.surveyDataValidator = exports.surveyDataSchema = exports.surveyExternalResolver = exports.surveyResolver = exports.surveyValidator = exports.surveySchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.surveySchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    text: typebox_1.Type.String()
}, { $id: 'Survey', additionalProperties: false });
exports.surveyValidator = (0, typebox_1.getValidator)(exports.surveySchema, validators_1.dataValidator);
exports.surveyResolver = (0, schema_1.resolve)({});
exports.surveyExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.surveyDataSchema = typebox_1.Type.Pick(exports.surveySchema, ['text'], {
    $id: 'SurveyData'
});
exports.surveyDataValidator = (0, typebox_1.getValidator)(exports.surveyDataSchema, validators_1.dataValidator);
exports.surveyDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.surveyPatchSchema = typebox_1.Type.Partial(exports.surveySchema, {
    $id: 'SurveyPatch'
});
exports.surveyPatchValidator = (0, typebox_1.getValidator)(exports.surveyPatchSchema, validators_1.dataValidator);
exports.surveyPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.surveyQueryProperties = typebox_1.Type.Pick(exports.surveySchema, ['id', 'text']);
exports.surveyQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.surveyQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.surveyQueryValidator = (0, typebox_1.getValidator)(exports.surveyQuerySchema, validators_1.queryValidator);
exports.surveyQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=survey.schema.js.map
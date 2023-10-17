"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherQueryResolver = exports.weatherQueryValidator = exports.weatherQuerySchema = exports.weatherQueryProperties = exports.weatherExternalResolver = exports.weatherResolver = exports.weatherValidator = exports.weatherSchema = void 0;
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
// Schema for allowed query properties
exports.weatherQueryProperties = typebox_1.Type.Pick(exports.weatherSchema, ['id', 'text']);
exports.weatherQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.weatherQueryProperties),
    typebox_1.Type.Object({
        temperature: typebox_1.Type.Optional(typebox_1.Type.Number()),
        temperaturePreference: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('mild'), typebox_1.Type.Literal('distinct')])),
        climatePreference: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('warmer'), typebox_1.Type.Literal('cooler')])),
        snowPreference: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('none'), typebox_1.Type.Literal('light'), typebox_1.Type.Literal('heavy')])),
        rainPreference: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('dry'), typebox_1.Type.Literal('regular')])),
        importantSeason: typebox_1.Type.Optional(typebox_1.Type.Union([
            typebox_1.Type.Literal('winter'),
            typebox_1.Type.Literal('summer'),
            typebox_1.Type.Literal('spring'),
            typebox_1.Type.Literal('fall')
        ])),
        seasonPreferenceDetail: typebox_1.Type.Optional(typebox_1.Type.Union([
            typebox_1.Type.Literal('mildWinter'),
            typebox_1.Type.Literal('coldWinter'),
            typebox_1.Type.Literal('snowyWinter'),
            typebox_1.Type.Literal('mildSummer'),
            typebox_1.Type.Literal('hotSummer'),
            typebox_1.Type.Literal('drySummer'),
            typebox_1.Type.Literal('warmSpring'),
            typebox_1.Type.Literal('coolSpring'),
            typebox_1.Type.Literal('drySpring'),
            typebox_1.Type.Literal('warmFall'),
            typebox_1.Type.Literal('coolFall'),
            typebox_1.Type.Literal('dryFall')
        ]))
    }, { additionalProperties: false })
], { additionalProperties: false });
exports.weatherQueryValidator = (0, typebox_1.getValidator)(exports.weatherQuerySchema, validators_1.queryValidator);
exports.weatherQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=weather.schema.js.map
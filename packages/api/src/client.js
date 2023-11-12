"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
const feathers_1 = require("@feathersjs/feathers");
const authentication_client_1 = __importDefault(require("@feathersjs/authentication-client"));
const air_quality_shared_1 = require("./services/air-quality/air-quality.shared");
const scenery_shared_1 = require("./services/scenery/scenery.shared");
const crime_shared_1 = require("./services/crime/crime.shared");
const public_services_shared_1 = require("./services/public-services/public-services.shared");
const housing_shared_1 = require("./services/housing/housing.shared");
const recreation_shared_1 = require("./services/recreation/recreation.shared");
const weather_shared_1 = require("./services/weather/weather.shared");
const industry_shared_1 = require("./services/industry/industry.shared");
const survey_shared_1 = require("./services/survey/survey.shared");
const places_shared_1 = require("./services/places/places.shared");
const occupation_shared_1 = require("./services/occupation/occupation.shared");
/**
 * Returns a typed client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
const createClient = (connection, authenticationOptions = {}) => {
    const client = (0, feathers_1.feathers)();
    client.configure(connection);
    client.configure((0, authentication_client_1.default)(authenticationOptions));
    client.set('connection', connection);
    client.configure(places_shared_1.placesClient);
    client.configure(survey_shared_1.surveyClient);
    client.configure(industry_shared_1.industryClient);
    client.configure(weather_shared_1.weatherClient);
    client.configure(occupation_shared_1.occupationClient);
    client.configure(recreation_shared_1.recreationClient);
    client.configure(housing_shared_1.housingClient);
    client.configure(public_services_shared_1.publicServicesClient);
    client.configure(crime_shared_1.crimeClient);
    client.configure(scenery_shared_1.sceneryClient);
    client.configure(air_quality_shared_1.airQualityClient);
    return client;
};
exports.createClient = createClient;
//# sourceMappingURL=client.js.map
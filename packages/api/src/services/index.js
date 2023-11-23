"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const users_1 = require("./users/users");
const forecast_1 = require("./forecast/forecast");
const air_quality_1 = require("./air-quality/air-quality");
const scenery_1 = require("./scenery/scenery");
const crime_1 = require("./crime/crime");
const public_services_1 = require("./public-services/public-services");
const housing_1 = require("./housing/housing");
const recreation_1 = require("./recreation/recreation");
const occupation_1 = require("./occupation/occupation");
const weather_1 = require("./weather/weather");
const industry_1 = require("./industry/industry");
const survey_1 = require("./survey/survey");
const services = (app) => {
    app.configure(users_1.users);
    app.configure(forecast_1.forecast);
    app.configure(air_quality_1.airQuality);
    app.configure(scenery_1.scenery);
    app.configure(crime_1.crime);
    app.configure(public_services_1.publicServices);
    app.configure(housing_1.housing);
    app.configure(recreation_1.recreation);
    app.configure(occupation_1.occupation);
    app.configure(weather_1.weather);
    app.configure(industry_1.industry);
    app.configure(survey_1.survey);
    // All services will be registered here
};
exports.services = services;
//# sourceMappingURL=index.js.map
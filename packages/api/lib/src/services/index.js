"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const housing_1 = require("./housing/housing");
const recreation_1 = require("./recreation/recreation");
const occupation_1 = require("./occupation/occupation");
const weather_1 = require("./weather/weather");
const industry_1 = require("./industry/industry");
const survey_1 = require("./survey/survey");
const places_1 = require("./places/places");
const services = (app) => {
    app.configure(housing_1.housing);
    app.configure(recreation_1.recreation);
    app.configure(occupation_1.occupation);
    app.configure(weather_1.weather);
    app.configure(industry_1.industry);
    app.configure(survey_1.survey);
    app.configure(places_1.places);
    // All services will be registered here
};
exports.services = services;
//# sourceMappingURL=index.js.map
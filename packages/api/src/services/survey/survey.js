"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.survey = void 0;
const survey_class_1 = require("./survey.class");
const survey_shared_1 = require("./survey.shared");
const survey_hooks_1 = require("./survey.hooks");
__exportStar(require("./survey.class"), exports);
__exportStar(require("./survey.schema"), exports);
const survey = (app) => {
    const sequelizeClient = app.get('sequelizeClient');
    app.use(survey_shared_1.surveyPath, new survey_class_1.SurveyService(app, sequelizeClient), {
        methods: survey_shared_1.surveyMethods,
        events: []
    });
    app.service(survey_shared_1.surveyPath).hooks(survey_hooks_1.surveyHooks);
};
exports.survey = survey;
//# sourceMappingURL=survey.js.map
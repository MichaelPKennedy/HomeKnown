"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyClient = exports.surveyMethods = exports.surveyPath = void 0;
exports.surveyPath = 'survey';
exports.surveyMethods = ['find', 'get', 'create', 'patch', 'remove'];
const surveyClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.surveyPath, connection.service(exports.surveyPath), {
        methods: exports.surveyMethods
    });
};
exports.surveyClient = surveyClient;
//# sourceMappingURL=survey.shared.js.map
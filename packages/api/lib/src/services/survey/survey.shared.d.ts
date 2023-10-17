import type { ClientApplication } from '../../client';
import type { Survey, SurveyData, SurveyPatch, SurveyQuery, SurveyService } from './survey.class';
export type { Survey, SurveyData, SurveyPatch, SurveyQuery };
export type SurveyClientService = Pick<SurveyService, (typeof surveyMethods)[number]>;
export declare const surveyPath = "survey";
export declare const surveyMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const surveyClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [surveyPath]: SurveyClientService;
    }
}

import type { Application } from '../../declarations';
import { SurveyService } from './survey.class';
import { surveyPath } from './survey.shared';
export * from './survey.class';
export * from './survey.schema';
export declare const survey: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [surveyPath]: SurveyService;
    }
}

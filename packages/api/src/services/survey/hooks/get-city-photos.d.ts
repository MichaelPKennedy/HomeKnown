import { Hook } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { SurveyService } from '../survey.class';
declare const getCityPhoto: Hook<Application, SurveyService>;
export default getCityPhoto;

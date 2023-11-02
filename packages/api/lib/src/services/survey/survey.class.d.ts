import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Survey, SurveyData, SurveyPatch, SurveyQuery } from './survey.schema';
export type { Survey, SurveyData, SurveyPatch, SurveyQuery };
interface QueryParams {
    query: string;
}
export interface SurveyParams extends Params {
    query?: QueryParams;
}
export interface SurveyFormData {
    data: {
        temperature: number;
        temperaturePreference?: 'mild' | 'distinct';
        climatePreference?: 'warmer' | 'cooler';
        snowPreference?: 'none' | 'light' | 'heavy';
        rainPreference?: 'dry' | 'regular';
        importantSeason?: 'winter' | 'summer' | 'spring' | 'fall';
        seasonPreferenceDetail?: 'mildWinter' | 'coldWinter' | 'snowyWinter' | 'mildSummer' | 'hotSummer' | 'drySummer' | 'warmSpring' | 'coolSpring' | 'drySpring' | 'warmFall' | 'coolFall' | 'dryFall';
        minSalary?: number;
        jobLevel?: 'entry-level' | 'senior' | 'both';
        futureAspiration?: string;
        selectedJobs?: {
            naics: string;
            occ: string;
        }[];
        livingPreference?: 'city' | 'suburb' | 'rural';
        housingBudget?: number;
        settingPreference?: string;
        hasChildren?: boolean;
        lowCrimePriority?: boolean;
        publicTransportation?: boolean;
        commuteTime?: string;
        proximityAirportHighway?: boolean;
        culturalOfferings?: boolean;
        nightlifeImportance?: boolean;
        landscapeFeatures?: string[];
        recreationalInterests?: string[];
        publicServices?: string[];
        searchRadius?: number;
        housingType?: 'rent' | 'buy';
        homeMin?: number;
        homeMax?: number;
        rentMin?: number;
        rentMax?: number;
        temperatureData: [
            {
                month: 'Jan';
                temp?: number;
            },
            {
                month: 'Feb';
                temp?: number;
            },
            {
                month: 'Mar';
                temp?: number;
            },
            {
                month: 'Apr';
                temp?: number;
            },
            {
                month: 'May';
                temp?: number;
            },
            {
                month: 'Jun';
                temp?: number;
            },
            {
                month: 'Jul';
                temp?: number;
            },
            {
                month: 'Aug';
                temp?: number;
            },
            {
                month: 'Sep';
                temp?: number;
            },
            {
                month: 'Oct';
                temp?: number;
            },
            {
                month: 'Nov';
                temp?: number;
            },
            {
                month: 'Dec';
                temp?: number;
            }
        ];
    };
}
export declare class SurveyService implements ServiceMethods<any> {
    app: Application;
    constructor(app: Application);
    create(data: SurveyFormData, params?: SurveyParams): Promise<any>;
    parseJobData(data: SurveyFormData): any;
    parseWeatherData(data: SurveyFormData): any;
    parseHousingData(data: SurveyFormData): any;
    parsePublicServicesData(data: SurveyFormData): any;
    getIndustryResponse(data: any): Promise<any>;
    getWeatherResponse(data: any): Promise<any>;
    getRecreationResponse(data: any): Promise<any>;
    getHousingResponse(data: any): Promise<any>;
    getPublicServicesResponse(data: any): Promise<any>;
    find(params: SurveyParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: SurveyParams): Promise<any>;
    update(id: NullableId, data: any, params?: SurveyParams): Promise<any>;
    patch(id: NullableId, data: any, params?: SurveyParams): Promise<any>;
    remove(id: NullableId, params?: SurveyParams): Promise<any>;
}

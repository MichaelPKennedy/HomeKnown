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
        snowPreference?: 'none' | 'light' | 'heavy';
        rainPreference?: 'dry' | 'regular';
        minSalary?: number;
        jobLevel?: 'entry-level' | 'senior' | 'both';
        selectedJobs?: {
            naics: string;
            occ: string;
        }[];
        livingPreference?: 'city' | 'suburb' | 'rural';
        recreationalInterests?: string[];
        publicServices?: string[];
        scenery?: string[];
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
        weights: {
            costOfLivingWeight?: number;
            recreationalActivitiesWeight?: number;
            weatherWeight?: number;
            jobOpportunityWeight?: number;
            publicServicesWeight?: number;
            crimeRateWeight?: number;
            sceneryWeight?: number;
            airQualityWeight?: number;
            totalAvailablePoints?: number;
        };
    };
}
export declare class SurveyService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    scoreCities(job: any, weather: any, recreation: any, publicServices: any, crime: any, scenery: any, airQuality: any, housing: any, weights: any, recreationFormData: any, jobFormData: any): any;
    create(data: SurveyFormData, params?: SurveyParams): Promise<any>;
    parseJobData(data: SurveyFormData): any;
    parseWeatherData(data: SurveyFormData): any;
    parseHousingData(data: SurveyFormData): any;
    parsePublicServicesData(data: SurveyFormData): any;
    parseSceneryData(data: SurveyFormData): any;
    parseRecreationData(data: SurveyFormData): any;
    getIndustryResponse(data: any): Promise<any>;
    getWeatherResponse(data: any): Promise<any>;
    getRecreationResponse(data: any): Promise<any>;
    getHousingResponse(data: any): Promise<any>;
    getPublicServicesResponse(data: any): Promise<any>;
    getSceneryResponse(data: any): Promise<any>;
    getAirQualityResponse(): Promise<any>;
    getCrimeResponse(): Promise<any>;
    getCityDetails(cities: any, recreation: any, job: any): Promise<any>;
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number>;
    find(params: SurveyParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: SurveyParams): Promise<any>;
    update(id: NullableId, data: any, params?: SurveyParams): Promise<any>;
    patch(id: NullableId, data: any, params?: SurveyParams): Promise<any>;
    remove(id: NullableId, params?: SurveyParams): Promise<any>;
}

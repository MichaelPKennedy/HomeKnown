import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
export interface WeatherParams extends Params {
    snowPreference?: 'none' | 'light' | 'heavy';
    rainPreference?: 'dry' | 'regular';
    temperatureData: [
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        },
        {
            month: string;
            temp?: number;
        }
    ];
}
export declare class WeatherService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: Params): Promise<any[] | Paginated<any>>;
    scoreResults(results: any[], temperatureData: WeatherParams['temperatureData'], snowPreference?: string, rainPreference?: string): Promise<any[]>;
    getSnowScore(totalSnow: number, preference: string): number;
    getRainScore(totalRain: number, preference: string): number;
    get(id: Id, params?: WeatherParams): Promise<any>;
    create(data: any, params?: WeatherParams): Promise<any>;
    update(id: NullableId, data: any, params?: WeatherParams): Promise<any>;
    patch(id: NullableId, data: any, params?: WeatherParams): Promise<any>;
    remove(id: NullableId, params?: WeatherParams): Promise<any>;
}

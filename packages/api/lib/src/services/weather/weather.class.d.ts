import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { WeatherSchema, WeatherData, WeatherPatch, WeatherQuery } from './weather.schema';
import type { Application } from '../../declarations';
export type { WeatherSchema, WeatherData, WeatherPatch, WeatherQuery };
interface QueryParams {
    query: string;
}
export interface WeatherParams extends Params {
    temperature: number;
    temperaturePreference?: 'mild' | 'distinct';
    climatePreference?: 'warmer' | 'cooler';
    snowPreference?: 'none' | 'light' | 'heavy';
    rainPreference?: 'dry' | 'regular';
    importantSeason?: 'winter' | 'summer' | 'spring' | 'fall';
    seasonPreferenceDetail?: 'mildWinter' | 'coldWinter' | 'snowyWinter' | 'mildSummer' | 'hotSummer' | 'drySummer' | 'warmSpring' | 'coolSpring' | 'drySpring' | 'warmFall' | 'coolFall' | 'dryFall';
}
export interface WeatherParams extends Params {
    query?: QueryParams;
}
export declare class WeatherService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    private getColumnsByDetail;
    find(params: WeatherParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: WeatherParams): Promise<any>;
    create(data: any, params?: WeatherParams): Promise<any>;
    update(id: NullableId, data: any, params?: WeatherParams): Promise<any>;
    patch(id: NullableId, data: any, params?: WeatherParams): Promise<any>;
    remove(id: NullableId, params?: WeatherParams): Promise<any>;
}

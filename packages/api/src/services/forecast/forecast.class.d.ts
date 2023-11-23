import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Forecast, ForecastData, ForecastPatch, ForecastQuery } from './forecast.schema';
export type { Forecast, ForecastData, ForecastPatch, ForecastQuery };
export interface ForecastParams extends Params {
    query?: {
        latitude: string;
        longitude: string;
    };
}
export declare class ForecastService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: ForecastParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: ForecastParams): Promise<any>;
    create(data: any, params?: ForecastParams): Promise<any>;
    update(id: NullableId, data: any, params?: ForecastParams): Promise<any>;
    patch(id: NullableId, data: any, params?: ForecastParams): Promise<any>;
    remove(id: NullableId, params?: ForecastParams): Promise<any>;
}

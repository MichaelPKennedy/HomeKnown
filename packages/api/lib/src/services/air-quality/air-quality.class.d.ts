import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { AirQuality, AirQualityData, AirQualityPatch, AirQualityQuery } from './air-quality.schema';
import type { Application } from '../../declarations';
export type { AirQuality, AirQualityData, AirQualityPatch, AirQualityQuery };
export interface AirQualityParams extends Params {
}
export declare class AirQualityService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: AirQualityParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: AirQualityParams): Promise<any>;
    create(data: any, params?: AirQualityParams): Promise<any>;
    update(id: NullableId, data: any, params?: AirQualityParams): Promise<any>;
    patch(id: NullableId, data: any, params?: AirQualityParams): Promise<any>;
    remove(id: NullableId, params?: AirQualityParams): Promise<any>;
}

import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery } from './public-services.schema';
export type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery };
export interface PublicServicesParams extends Params {
    query?: {
        publicServices?: string[];
        searchRadius?: number;
    };
}
export declare class PublicServicesService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: PublicServicesParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: PublicServicesParams): Promise<any>;
    create(data: any, params?: PublicServicesParams): Promise<any>;
    update(id: NullableId, data: any, params?: PublicServicesParams): Promise<any>;
    patch(id: NullableId, data: any, params?: PublicServicesParams): Promise<any>;
    remove(id: NullableId, params?: PublicServicesParams): Promise<any>;
}

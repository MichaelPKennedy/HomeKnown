import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Recreation, RecreationData, RecreationPatch, RecreationQuery } from './recreation.schema';
export type { Recreation, RecreationData, RecreationPatch, RecreationQuery };
export interface RecreationParams extends Params {
    query: RecreationQuery;
}
export declare class RecreationService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: RecreationParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: RecreationParams): Promise<any>;
    create(data: any, params?: RecreationParams): Promise<any>;
    update(id: NullableId, data: any, params?: RecreationParams): Promise<any>;
    patch(id: NullableId, data: any, params?: RecreationParams): Promise<any>;
    remove(id: NullableId, params?: RecreationParams): Promise<any>;
}

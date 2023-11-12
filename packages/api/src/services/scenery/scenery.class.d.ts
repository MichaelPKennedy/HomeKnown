import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Scenery, SceneryData, SceneryPatch, SceneryQuery } from './scenery.schema';
export type { Scenery, SceneryData, SceneryPatch, SceneryQuery };
export interface SceneryParams extends Params {
    query?: {
        scenery?: string[];
        searchRadius?: number;
    };
}
export declare class SceneryService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: SceneryParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: SceneryParams): Promise<any>;
    create(data: any, params?: SceneryParams): Promise<any>;
    update(id: NullableId, data: any, params?: SceneryParams): Promise<any>;
    patch(id: NullableId, data: any, params?: SceneryParams): Promise<any>;
    remove(id: NullableId, params?: SceneryParams): Promise<any>;
}

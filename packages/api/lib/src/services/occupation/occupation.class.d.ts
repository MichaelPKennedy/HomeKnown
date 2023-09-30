import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Occupation, OccupationData, OccupationPatch, OccupationQuery } from './occupation.schema';
export type { Occupation, OccupationData, OccupationPatch, OccupationQuery };
interface QueryParams {
    query: string;
}
export interface OccupationParams extends Params {
    query?: QueryParams;
}
export declare class OccupationService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: OccupationParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: OccupationParams): Promise<any>;
    create(data: any, params?: OccupationParams): Promise<any>;
    update(id: NullableId, data: any, params?: OccupationParams): Promise<any>;
    patch(id: NullableId, data: any, params?: OccupationParams): Promise<any>;
    remove(id: NullableId, params?: OccupationParams): Promise<any>;
}

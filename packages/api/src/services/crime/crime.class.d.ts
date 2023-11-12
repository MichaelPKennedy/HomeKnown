import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Crime, CrimeData, CrimePatch, CrimeQuery } from './crime.schema';
export type { Crime, CrimeData, CrimePatch, CrimeQuery };
export interface CrimeParams extends Params {
}
export declare class CrimeService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: CrimeParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: CrimeParams): Promise<any>;
    create(data: any, params?: CrimeParams): Promise<any>;
    update(id: NullableId, data: any, params?: CrimeParams): Promise<any>;
    patch(id: NullableId, data: any, params?: CrimeParams): Promise<any>;
    remove(id: NullableId, params?: CrimeParams): Promise<any>;
}

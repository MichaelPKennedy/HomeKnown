import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Industry, IndustryData, IndustryPatch, IndustryQuery } from './industry.schema';
export type { Industry, IndustryData, IndustryPatch, IndustryQuery };
export interface IndustryParams extends Params {
    query?: {
        selectedJobs: {
            occ_title: string;
            occ_code: string;
        }[];
        minSalary: number;
        jobLevel: 'entry-level' | 'senior' | 'both';
    };
}
export declare class IndustryService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: IndustryParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: IndustryParams): Promise<any>;
    create(data: any, params?: IndustryParams): Promise<any>;
    update(id: NullableId, data: any, params?: IndustryParams): Promise<any>;
    patch(id: NullableId, data: any, params?: IndustryParams): Promise<any>;
    remove(id: NullableId, params?: IndustryParams): Promise<any>;
}

import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Housing, HousingData, HousingPatch, HousingQuery } from './housing.schema';
export type { Housing, HousingData, HousingPatch, HousingQuery };
export interface HousingParams extends Params {
    query?: {
        housingType: 'rent' | 'buy';
        homeMin: number;
        homeMax: number;
        rentMin: number;
        rentMax: number;
    };
}
export declare class HousingService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: HousingParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: HousingParams): Promise<any>;
    create(data: any, params?: HousingParams): Promise<any>;
    update(id: NullableId, data: any, params?: HousingParams): Promise<any>;
    patch(id: NullableId, data: any, params?: HousingParams): Promise<any>;
    remove(id: NullableId, params?: HousingParams): Promise<any>;
}

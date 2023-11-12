import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
interface QueryParams {
    query: string;
}
export interface PlacesParams extends Params {
    query?: QueryParams;
}
export declare class PlacesService implements ServiceMethods<any> {
    app: Application;
    constructor(app: Application);
    find(params: PlacesParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: PlacesParams): Promise<any>;
    create(data: any, params?: PlacesParams): Promise<any>;
    update(id: NullableId, data: any, params?: PlacesParams): Promise<any>;
    patch(id: NullableId, data: any, params?: PlacesParams): Promise<any>;
    remove(id: NullableId, params?: PlacesParams): Promise<any>;
}
export {};

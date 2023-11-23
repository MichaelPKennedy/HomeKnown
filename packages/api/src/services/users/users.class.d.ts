import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import type { Application } from '../../declarations';
import type { Users, UsersData, UsersPatch, UsersQuery } from './users.schema';
export type { Users, UsersData, UsersPatch, UsersQuery };
export interface UsersParams extends Params {
    query?: {
        username: string;
        password: string;
        primary_email: string;
    };
}
export declare class UsersService implements ServiceMethods<any> {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    find(params: UsersParams): Promise<any[] | Paginated<any>>;
    get(id: Id, params?: UsersParams): Promise<any>;
    create(data: UsersData, params?: UsersParams): Promise<Users>;
    login(data: {
        login: string;
        password: string;
    }): Promise<{
        accessToken: string;
    }>;
    update(id: NullableId, data: any, params?: UsersParams): Promise<any>;
    patch(id: NullableId, data: any, params?: UsersParams): Promise<any>;
    remove(id: NullableId, params?: UsersParams): Promise<any>;
}

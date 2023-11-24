import { LocalStrategy } from '@feathersjs/authentication-local';
import { AuthenticationResult } from '@feathersjs/authentication';
import { Application } from '@feathersjs/feathers';
interface User {
    id: number;
    username: string;
    primary_email: string;
    password: string;
}
declare class CustomStrategy extends LocalStrategy {
    app: Application;
    sequelize: any;
    constructor(app: Application, sequelizeClient: any);
    findEntity(login: string, params: any): Promise<User | null>;
    verify(params: any, password: string, entity: User): Promise<User>;
    getEntityQuery(query: any, params: any): Promise<any>;
    getPayload(authResult: AuthenticationResult, params: any): Promise<{
        accessToken: string;
    }>;
}
export default CustomStrategy;

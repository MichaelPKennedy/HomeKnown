import type { ClientApplication } from '../../client';
import type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery, PublicServicesService } from './public-services.class';
export type { PublicServices, PublicServicesData, PublicServicesPatch, PublicServicesQuery };
export type PublicServicesClientService = Pick<PublicServicesService, (typeof publicServicesMethods)[number]>;
export declare const publicServicesPath = "public-services";
export declare const publicServicesMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const publicServicesClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [publicServicesPath]: PublicServicesClientService;
    }
}

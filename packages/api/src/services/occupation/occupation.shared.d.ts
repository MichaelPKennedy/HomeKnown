import type { ClientApplication } from '../../client';
import type { OccupationService } from './occupation.class';
export type OccupationClientService = Pick<OccupationService, (typeof occupationMethods)[number]>;
export declare const occupationPath = "/occupation";
export declare const occupationMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const occupationClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [occupationPath]: OccupationClientService;
    }
}

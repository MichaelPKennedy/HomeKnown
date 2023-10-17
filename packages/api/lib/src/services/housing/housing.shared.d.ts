import type { ClientApplication } from '../../client';
import type { Housing, HousingData, HousingPatch, HousingQuery, HousingService } from './housing.class';
export type { Housing, HousingData, HousingPatch, HousingQuery };
export type HousingClientService = Pick<HousingService, (typeof housingMethods)[number]>;
export declare const housingPath = "housing";
export declare const housingMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const housingClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [housingPath]: HousingClientService;
    }
}

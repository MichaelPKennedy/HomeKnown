import type { ClientApplication } from '../../client';
import type { Recreation, RecreationData, RecreationPatch, RecreationService, RecreationQuery } from './recreation.class';
export type { Recreation, RecreationData, RecreationPatch, RecreationQuery };
export type RecreationClientService = Pick<RecreationService, (typeof recreationMethods)[number]>;
export declare const recreationPath = "recreation";
export declare const recreationMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const recreationClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [recreationPath]: RecreationClientService;
    }
}

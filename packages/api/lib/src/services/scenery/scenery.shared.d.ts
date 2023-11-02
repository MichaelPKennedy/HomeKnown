import type { ClientApplication } from '../../client';
import type { Scenery, SceneryData, SceneryPatch, SceneryQuery, SceneryService } from './scenery.class';
export type { Scenery, SceneryData, SceneryPatch, SceneryQuery };
export type SceneryClientService = Pick<SceneryService, (typeof sceneryMethods)[number]>;
export declare const sceneryPath = "scenery";
export declare const sceneryMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const sceneryClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [sceneryPath]: SceneryClientService;
    }
}

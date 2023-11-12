import type { ClientApplication } from '../../client';
import type { PlacesService } from './places.class';
export type PlacesClientService = Pick<PlacesService, (typeof placesMethods)[number]>;
export declare const placesPath = "/places";
export declare const placesMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const placesClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [placesPath]: PlacesClientService;
    }
}

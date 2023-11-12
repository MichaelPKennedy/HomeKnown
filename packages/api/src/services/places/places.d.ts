import type { Application } from '../../declarations';
import { PlacesService } from './places.class';
import { placesPath } from './places.shared';
export * from './places.class';
export * from './places.schema';
export declare const places: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [placesPath]: PlacesService;
    }
}

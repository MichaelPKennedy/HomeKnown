import type { Application } from '../../declarations';
import { SceneryService } from './scenery.class';
import { sceneryPath } from './scenery.shared';
export * from './scenery.class';
export * from './scenery.schema';
export declare const scenery: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [sceneryPath]: SceneryService;
    }
}

import type { Application } from '../../declarations';
import { RecreationService } from './recreation.class';
import { recreationPath } from './recreation.shared';
export * from './recreation.class';
export * from './recreation.schema';
export declare const recreation: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [recreationPath]: RecreationService;
    }
}

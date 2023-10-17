import type { Application } from '../../declarations';
import { OccupationService } from './occupation.class';
import { occupationPath } from './occupation.shared';
export * from './occupation.class';
export * from './occupation.schema';
export declare const occupation: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [occupationPath]: OccupationService;
    }
}

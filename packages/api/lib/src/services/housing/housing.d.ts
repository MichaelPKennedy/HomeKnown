import type { Application } from '../../declarations';
import { HousingService } from './housing.class';
import { housingPath } from './housing.shared';
export * from './housing.class';
export * from './housing.schema';
export declare const housing: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [housingPath]: HousingService;
    }
}

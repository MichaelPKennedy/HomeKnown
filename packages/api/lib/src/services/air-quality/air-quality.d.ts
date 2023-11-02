import type { Application } from '../../declarations';
import { AirQualityService } from './air-quality.class';
import { airQualityPath } from './air-quality.shared';
export * from './air-quality.class';
export * from './air-quality.schema';
export declare const airQuality: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [airQualityPath]: AirQualityService;
    }
}

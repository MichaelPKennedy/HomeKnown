import type { Application } from '../../declarations';
import { ForecastService } from './forecast.class';
import { forecastPath } from './forecast.shared';
export * from './forecast.class';
export * from './forecast.schema';
export declare const forecast: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [forecastPath]: ForecastService;
    }
}

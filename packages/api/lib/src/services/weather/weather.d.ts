import type { Application } from '../../declarations';
import { WeatherService } from './weather.class';
import { weatherPath } from './weather.shared';
export * from './weather.class';
export * from './weather.schema';
export declare const weather: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [weatherPath]: WeatherService;
    }
}

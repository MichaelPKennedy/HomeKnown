import type { ClientApplication } from '../../client';
import type { WeatherService } from './weather.class';
export type WeatherClientService = Pick<WeatherService, (typeof weatherMethods)[number]>;
export declare const weatherPath = "weather";
export declare const weatherMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const weatherClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [weatherPath]: WeatherClientService;
    }
}

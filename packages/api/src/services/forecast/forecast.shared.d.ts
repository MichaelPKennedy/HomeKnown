import type { ClientApplication } from '../../client';
import type { Forecast, ForecastData, ForecastPatch, ForecastQuery, ForecastService } from './forecast.class';
export type { Forecast, ForecastData, ForecastPatch, ForecastQuery };
export type ForecastClientService = Pick<ForecastService, (typeof forecastMethods)[number]>;
export declare const forecastPath = "forecast";
export declare const forecastMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const forecastClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [forecastPath]: ForecastClientService;
    }
}

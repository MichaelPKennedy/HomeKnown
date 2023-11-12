import type { ClientApplication } from '../../client';
import type { AirQuality, AirQualityData, AirQualityPatch, AirQualityQuery, AirQualityService } from './air-quality.class';
export type { AirQuality, AirQualityData, AirQualityPatch, AirQualityQuery };
export type AirQualityClientService = Pick<AirQualityService, (typeof airQualityMethods)[number]>;
export declare const airQualityPath = "air-quality";
export declare const airQualityMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const airQualityClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [airQualityPath]: AirQualityClientService;
    }
}

import type { ClientApplication } from '../../client';
import type { Industry, IndustryData, IndustryPatch, IndustryQuery, IndustryService } from './industry.class';
export type { Industry, IndustryData, IndustryPatch, IndustryQuery };
export type IndustryClientService = Pick<IndustryService, (typeof industryMethods)[number]>;
export declare const industryPath = "industry";
export declare const industryMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const industryClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [industryPath]: IndustryClientService;
    }
}

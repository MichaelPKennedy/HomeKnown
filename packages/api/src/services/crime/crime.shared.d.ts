import type { ClientApplication } from '../../client';
import type { Crime, CrimeData, CrimePatch, CrimeQuery, CrimeService } from './crime.class';
export type { Crime, CrimeData, CrimePatch, CrimeQuery };
export type CrimeClientService = Pick<CrimeService, (typeof crimeMethods)[number]>;
export declare const crimePath = "crime";
export declare const crimeMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const crimeClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [crimePath]: CrimeClientService;
    }
}

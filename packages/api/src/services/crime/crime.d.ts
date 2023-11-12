import type { Application } from '../../declarations';
import { CrimeService } from './crime.class';
import { crimePath } from './crime.shared';
export * from './crime.class';
export * from './crime.schema';
export declare const crime: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [crimePath]: CrimeService;
    }
}

import type { Application } from '../../declarations';
import { PublicServicesService } from './public-services.class';
import { publicServicesPath } from './public-services.shared';
export * from './public-services.class';
export * from './public-services.schema';
export declare const publicServices: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [publicServicesPath]: PublicServicesService;
    }
}

import type { Application } from '../../declarations';
import { IndustryService } from './industry.class';
import { industryPath } from './industry.shared';
export * from './industry.class';
export * from './industry.schema';
export declare const industry: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [industryPath]: IndustryService;
    }
}

import { HookContext as FeathersHookContext, NextFunction } from '@feathersjs/feathers';
import { Application as FeathersApplication } from '@feathersjs/express';
import { ApplicationConfiguration } from './configuration';
export { NextFunction };
export interface Configuration extends ApplicationConfiguration {
}
export interface ServiceTypes {
}
export type Application = FeathersApplication<ServiceTypes, Configuration>;
export type HookContext<S = any> = FeathersHookContext<Application, S>;

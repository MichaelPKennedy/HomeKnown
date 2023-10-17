import type { TransportConnection, Application } from '@feathersjs/feathers';
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client';
import './services/housing/housing.shared';
export type { Housing, HousingData, HousingQuery, HousingPatch } from './services/housing/housing.shared';
import './services/recreation/recreation.shared';
export type { Recreation, RecreationData, RecreationQuery, RecreationPatch } from './services/recreation/recreation.shared';
import './services/weather/weather.shared';
import './services/industry/industry.shared';
export type { Industry, IndustryData, IndustryQuery, IndustryPatch } from './services/industry/industry.shared';
import './services/survey/survey.shared';
export type { Survey, SurveyData, SurveyQuery, SurveyPatch } from './services/survey/survey.shared';
import './services/places/places.shared';
import './services/occupation/occupation.shared';
export interface Configuration {
    connection: TransportConnection<ServiceTypes>;
}
export interface ServiceTypes {
}
export type ClientApplication = Application<ServiceTypes, Configuration>;
/**
 * Returns a typed client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export declare const createClient: <Configuration_1 = any>(connection: TransportConnection<ServiceTypes>, authenticationOptions?: Partial<AuthenticationClientOptions>) => ClientApplication;

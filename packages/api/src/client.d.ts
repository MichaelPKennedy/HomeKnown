import type { TransportConnection, Application } from '@feathersjs/feathers';
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client';
import './services/air-quality/air-quality.shared';
export type { AirQuality, AirQualityData, AirQualityQuery, AirQualityPatch } from './services/air-quality/air-quality.shared';
import './services/scenery/scenery.shared';
export type { Scenery, SceneryData, SceneryQuery, SceneryPatch } from './services/scenery/scenery.shared';
import './services/crime/crime.shared';
export type { Crime, CrimeData, CrimeQuery, CrimePatch } from './services/crime/crime.shared';
import './services/public-services/public-services.shared';
export type { PublicServices, PublicServicesData, PublicServicesQuery, PublicServicesPatch } from './services/public-services/public-services.shared';
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

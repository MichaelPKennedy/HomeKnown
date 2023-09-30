import type { TransportConnection, Application } from '@feathersjs/feathers';
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client';
import './services/occupation/occupation.shared';
export type { Occupation, OccupationData, OccupationQuery, OccupationPatch } from './services/occupation/occupation.shared';
import './services/weather/weather.shared';
export type { Weather, WeatherData, WeatherQuery, WeatherPatch } from './services/weather/weather.shared';
import './services/industry/industry.shared';
export type { Industry, IndustryData, IndustryQuery, IndustryPatch } from './services/industry/industry.shared';
import './services/survey/survey.shared';
export type { Survey, SurveyData, SurveyQuery, SurveyPatch } from './services/survey/survey.shared';
import './services/places/places.shared';
export type { Places, PlacesData, PlacesQuery, PlacesPatch } from './services/places/places.shared';
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

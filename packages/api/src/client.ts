// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { occupationClient } from './services/occupation/occupation.shared'
export type {
  Occupation,
  OccupationData,
  OccupationQuery,
  OccupationPatch
} from './services/occupation/occupation.shared'

import { weatherClient } from './services/weather/weather.shared'
export type { Weather, WeatherData, WeatherQuery, WeatherPatch } from './services/weather/weather.shared'

import { industryClient } from './services/industry/industry.shared'
export type {
  Industry,
  IndustryData,
  IndustryQuery,
  IndustryPatch
} from './services/industry/industry.shared'

import { surveyClient } from './services/survey/survey.shared'
export type { Survey, SurveyData, SurveyQuery, SurveyPatch } from './services/survey/survey.shared'

import { placesClient } from './services/places/places.shared'
export type { Places, PlacesData, PlacesQuery, PlacesPatch } from './services/places/places.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(placesClient)
  client.configure(surveyClient)
  client.configure(industryClient)
  client.configure(weatherClient)
  client.configure(occupationClient)
  return client
}

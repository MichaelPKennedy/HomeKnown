// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { blogClient } from './services/blog/blog.shared'
export type { Blog, BlogData, BlogQuery, BlogPatch } from './services/blog/blog.shared'

import { costClient } from './services/cost/cost.shared'
export type { Cost, CostData, CostQuery, CostPatch } from './services/cost/cost.shared'

import { notificationsClient } from './services/notifications/notifications.shared'
export type {
  Notifications,
  NotificationsData,
  NotificationsQuery,
  NotificationsPatch
} from './services/notifications/notifications.shared'

import { realtyClient } from './services/realty/realty.shared'
export type { Realty, RealtyData, RealtyQuery, RealtyPatch } from './services/realty/realty.shared'

import { forgotPasswordClient } from './services/forgot-password/forgot-password.shared'
export type {
  ForgotPassword,
  ForgotPasswordData,
  ForgotPasswordQuery,
  ForgotPasswordPatch
} from './services/forgot-password/forgot-password.shared'

import { categoriesClient } from './services/categories/categories.shared'
export type {
  Categories,
  CategoriesData,
  CategoriesQuery,
  CategoriesPatch
} from './services/categories/categories.shared'

import { contactSupportClient } from './services/contact-support/contact-support.shared'
export type {
  ContactSupport,
  ContactSupportData,
  ContactSupportQuery,
  ContactSupportPatch
} from './services/contact-support/contact-support.shared'

import { emailVerificationClient } from './services/email-verification/email-verification.shared'
export type {
  EmailVerification,
  EmailVerificationData,
  EmailVerificationQuery,
  EmailVerificationPatch
} from './services/email-verification/email-verification.shared'

import { statsClient } from './services/stats/stats.shared'
export type { Stats, StatsData, StatsQuery, StatsPatch } from './services/stats/stats.shared'

import { recommendationsClient } from './services/recommendations/recommendations.shared'
export type {
  Recommendations,
  RecommendationsData,
  RecommendationsQuery,
  RecommendationsPatch
} from './services/recommendations/recommendations.shared'

import { searchClient } from './services/search/search.shared'
export type { Search, SearchData, SearchQuery, SearchPatch } from './services/search/search.shared'

import { photosClient } from './services/photos/photos.shared'
export type { Photos, PhotosData, PhotosQuery, PhotosPatch } from './services/photos/photos.shared'

import { userCitiesClient } from './services/user-cities/user-cities.shared'
export type {
  UserCities,
  UserCitiesData,
  UserCitiesQuery,
  UserCitiesPatch
} from './services/user-cities/user-cities.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

import { forecastClient } from './services/forecast/forecast.shared'
export type {
  Forecast,
  ForecastData,
  ForecastQuery,
  ForecastPatch
} from './services/forecast/forecast.shared'

import { airQualityClient } from './services/air-quality/air-quality.shared'
export type {
  AirQuality,
  AirQualityData,
  AirQualityQuery,
  AirQualityPatch
} from './services/air-quality/air-quality.shared'

import { sceneryClient } from './services/scenery/scenery.shared'
export type { Scenery, SceneryData, SceneryQuery, SceneryPatch } from './services/scenery/scenery.shared'

import { crimeClient } from './services/crime/crime.shared'
export type { Crime, CrimeData, CrimeQuery, CrimePatch } from './services/crime/crime.shared'

import { publicServicesClient } from './services/public-services/public-services.shared'
export type {
  PublicServices,
  PublicServicesData,
  PublicServicesQuery,
  PublicServicesPatch
} from './services/public-services/public-services.shared'

import { housingClient } from './services/housing/housing.shared'
export type { Housing, HousingData, HousingQuery, HousingPatch } from './services/housing/housing.shared'

import { recreationClient } from './services/recreation/recreation.shared'
export type {
  Recreation,
  RecreationData,
  RecreationQuery,
  RecreationPatch
} from './services/recreation/recreation.shared'

import { weatherClient } from './services/weather/weather.shared'

import { industryClient } from './services/industry/industry.shared'
export type {
  Industry,
  IndustryData,
  IndustryQuery,
  IndustryPatch
} from './services/industry/industry.shared'

import { surveyClient } from './services/survey/survey.shared'
export type { SurveyData, SurveyPatch } from './services/survey/survey.shared'

import { occupationClient } from './services/occupation/occupation.shared'

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

  client.configure(surveyClient)
  client.configure(industryClient)
  client.configure(weatherClient)
  client.configure(occupationClient)
  client.configure(recreationClient)
  client.configure(housingClient)
  client.configure(publicServicesClient)
  client.configure(crimeClient)
  client.configure(sceneryClient)
  client.configure(airQualityClient)
  client.configure(forecastClient)
  client.configure(userClient)
  client.configure(userClient)
  client.configure(userCitiesClient)
  client.configure(photosClient)
  client.configure(searchClient)
  client.configure(recommendationsClient)
  client.configure(statsClient)
  client.configure(emailVerificationClient)
  client.configure(contactSupportClient)
  client.configure(categoriesClient)
  client.configure(forgotPasswordClient)
  client.configure(realtyClient)
  client.configure(notificationsClient)
  client.configure(costClient)
  client.configure(blogClient)
  return client
}

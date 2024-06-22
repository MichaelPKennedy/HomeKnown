import { cost } from './cost/cost'
import { notifications } from './notifications/notifications'
import { realty } from './realty/realty'
import { forgotPassword } from './forgot-password/forgot-password'
import { categories } from './categories/categories'
import { contactSupport } from './contact-support/contact-support'
import { emailVerification } from './email-verification/email-verification'
import { stats } from './stats/stats'
import { recommendations } from './recommendations/recommendations'
import { search } from './search/search'
import { photos } from './photos/photos'
import { userCities } from './user-cities/user-cities'
import { user } from './users/users'
import { forecast } from './forecast/forecast'
import { airQuality } from './air-quality/air-quality'
import { scenery } from './scenery/scenery'
import { crime } from './crime/crime'
import { publicServices } from './public-services/public-services'
import { housing } from './housing/housing'
import { recreation } from './recreation/recreation'
import { occupation } from './occupation/occupation'
import { weather } from './weather/weather'
import { industry } from './industry/industry'
import { survey } from './survey/survey'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(cost)
  app.configure(notifications)
  app.configure(realty)
  app.configure(forgotPassword)
  app.configure(categories)
  app.configure(contactSupport)
  app.configure(emailVerification)
  app.configure(stats)
  app.configure(recommendations)
  app.configure(search)
  app.configure(photos)
  app.configure(userCities)
  app.configure(user)
  app.configure(forecast)
  app.configure(airQuality)
  app.configure(scenery)
  app.configure(crime)
  app.configure(publicServices)
  app.configure(housing)
  app.configure(recreation)
  app.configure(occupation)
  app.configure(weather)
  app.configure(industry)
  app.configure(survey)
  // All services will be registered here
}

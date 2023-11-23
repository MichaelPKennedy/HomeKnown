import { users } from './users/users'
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
  app.configure(users)
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

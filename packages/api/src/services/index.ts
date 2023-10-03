import { recreation } from './recreation/recreation'
import { occupation } from './occupation/occupation'
import { weather } from './weather/weather'
import { industry } from './industry/industry'
import { survey } from './survey/survey'
import { places } from './places/places'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(recreation)
  app.configure(occupation)
  app.configure(weather)
  app.configure(industry)
  app.configure(survey)
  app.configure(places)
  // All services will be registered here
}

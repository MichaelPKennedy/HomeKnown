const { disallow } = require('feathers-hooks-common')
import { authenticate } from '@feathersjs/authentication/lib/hooks'
import nearbyIndustryData from './hooks/nearby-industry-data'
import setUserSurveyData from './hooks/set-user-survey-data'
import getCityPhoto from './hooks/get-city-photos'

export const surveyHooks = {
  before: {
    all: [authenticate('jwt', 'apiKey')],
    find: [],
    get: [],
    create: [setUserSurveyData],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },
  after: {
    all: [],
    find: [],
    get: [getCityPhoto],
    create: [nearbyIndustryData, getCityPhoto],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}

const { disallow } = require('feathers-hooks-common')
import nearbyIndustryData from './hooks/nearby-industry-data'
import setUserSurveyData from './hooks/set-user-survey-data'
import getCityPhoto from './hooks/get-city-photos'

export const surveyHooks = {
  before: {
    all: [],
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

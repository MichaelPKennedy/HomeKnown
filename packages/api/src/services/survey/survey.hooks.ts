const { disallow } = require('feathers-hooks-common')
import nearbyIndustryData from './hooks/nearby-industry-data'

export const surveyHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [nearbyIndustryData],
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

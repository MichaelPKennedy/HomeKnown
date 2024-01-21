const { disallow } = require('feathers-hooks-common')
import getCityPhoto from './hooks/get-city-photos'

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
    find: [getCityPhoto],
    get: [getCityPhoto],
    create: [getCityPhoto],
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

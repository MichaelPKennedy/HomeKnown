const { disallow } = require('feathers-hooks-common')
import { authenticate } from '@feathersjs/authentication/lib/hooks'
import getCityPhoto from './hooks/get-city-photos'
export const recommendationsHooks = {
  before: {
    all: [authenticate('jwt', 'apiKey')],
    find: [],
    get: [],
    create: [disallow('external')],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },
  after: {
    all: [],
    find: [getCityPhoto],
    get: [],
    create: [],
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

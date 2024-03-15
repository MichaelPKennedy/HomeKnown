const { disallow } = require('feathers-hooks-common')
import { authenticate } from '@feathersjs/authentication/lib/hooks'

export const userCitiesHooks = {
  before: {
    all: [authenticate('jwt', 'apiKey')],
    find: [],
    get: [],
    create: [],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: []
  },
  after: {
    all: [],
    find: [],
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

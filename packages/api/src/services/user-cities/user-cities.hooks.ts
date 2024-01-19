const { disallow } = require('feathers-hooks-common')
export const userCitiesHooks = {
  before: {
    all: [],
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

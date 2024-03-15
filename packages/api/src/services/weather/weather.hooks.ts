const { authenticate } = require('@feathersjs/authentication').hooks
const { disallow } = require('feathers-hooks-common')

module.exports = {
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

const { disallow } = require('feathers-hooks-common')
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './users.schema'
import welcomeEmail from './hooks/send-welcome-email'

export const userHooks = {
  around: {
    all: [schemaHooks.resolveResult(userResolver), authenticate('jwt', 'apiKey')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  before: {
    all: [
      schemaHooks.validateQuery(userQueryValidator),
      schemaHooks.resolveQuery(userQueryResolver),
      authenticate('jwt', 'apiKey')
    ],
    find: [],
    get: [],
    create: [schemaHooks.validateData(userDataValidator), schemaHooks.resolveData(userDataResolver)],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    create: [welcomeEmail]
  },
  error: {
    all: []
  }
}

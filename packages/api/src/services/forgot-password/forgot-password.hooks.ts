const { disallow } = require('feathers-hooks-common')
import { authenticate } from '@feathersjs/authentication/lib/hooks'
import sendForgotPswdEmail from './hooks/send-forgot-pswd-email'
export const forgotPasswordHooks = {
  before: {
    all: [authenticate('jwt', 'apiKey')],
    find: [],
    get: [],
    create: [],
    update: [disallow('external')],
    patch: [],
    remove: [disallow('external')]
  },
  after: {
    all: [],
    find: [sendForgotPswdEmail],
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

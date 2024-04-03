// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  ForgotPassword,
  ForgotPasswordData,
  ForgotPasswordPatch,
  ForgotPasswordQuery,
  ForgotPasswordService
} from './forgot-password.class'

export type { ForgotPassword, ForgotPasswordData, ForgotPasswordPatch, ForgotPasswordQuery }

export type ForgotPasswordClientService = Pick<ForgotPasswordService, (typeof forgotPasswordMethods)[number]>

export const forgotPasswordPath = 'forgot-password'

export const forgotPasswordMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const forgotPasswordClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(forgotPasswordPath, connection.service(forgotPasswordPath), {
    methods: forgotPasswordMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [forgotPasswordPath]: ForgotPasswordClientService
  }
}

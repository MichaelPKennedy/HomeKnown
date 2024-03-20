// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  EmailVerification,
  EmailVerificationData,
  EmailVerificationPatch,
  EmailVerificationQuery,
  EmailVerificationService
} from './email-verification.class'

export type { EmailVerification, EmailVerificationData, EmailVerificationPatch, EmailVerificationQuery }

export type EmailVerificationClientService = Pick<
  EmailVerificationService,
  (typeof emailVerificationMethods)[number]
>

export const emailVerificationPath = 'email-verification'

export const emailVerificationMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const emailVerificationClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(emailVerificationPath, connection.service(emailVerificationPath), {
    methods: emailVerificationMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [emailVerificationPath]: EmailVerificationClientService
  }
}

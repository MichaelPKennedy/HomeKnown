// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  ContactSupport,
  ContactSupportData,
  ContactSupportPatch,
  ContactSupportQuery,
  ContactSupportService
} from './contact-support.class'

export type { ContactSupport, ContactSupportData, ContactSupportPatch, ContactSupportQuery }

export type ContactSupportClientService = Pick<ContactSupportService, (typeof contactSupportMethods)[number]>

export const contactSupportPath = 'contact-support'

export const contactSupportMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const contactSupportClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(contactSupportPath, connection.service(contactSupportPath), {
    methods: contactSupportMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [contactSupportPath]: ContactSupportClientService
  }
}

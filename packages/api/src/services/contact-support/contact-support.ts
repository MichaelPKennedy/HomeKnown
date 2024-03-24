// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { ContactSupportService } from './contact-support.class'
import { contactSupportPath, contactSupportMethods } from './contact-support.shared'
import { contactSupportHooks } from './contact-support.hooks'

export * from './contact-support.class'
export * from './contact-support.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const contactSupport = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(contactSupportPath, new ContactSupportService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: contactSupportMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(contactSupportPath).hooks(contactSupportHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [contactSupportPath]: ContactSupportService
  }
}

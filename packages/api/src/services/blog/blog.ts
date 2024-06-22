// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { BlogService } from './blog.class'
import { blogPath, blogMethods } from './blog.shared'
import { blogHooks } from './blog.hooks'

export * from './blog.class'
export * from './blog.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const blog = (app: Application) => {
  // Register our service on the Feathers application
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(blogPath, new BlogService(app, sequelizeClient), {
    // A list of all methods this service exposes externally
    methods: blogMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(blogPath).hooks(blogHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [blogPath]: BlogService
  }
}

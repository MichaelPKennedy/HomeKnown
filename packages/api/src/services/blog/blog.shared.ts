// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Blog, BlogData, BlogPatch, BlogQuery, BlogService } from './blog.class'

export type { Blog, BlogData, BlogPatch, BlogQuery }

export type BlogClientService = Pick<BlogService, (typeof blogMethods)[number]>

export const blogPath = 'blog'

export const blogMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const blogClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(blogPath, connection.service(blogPath), {
    methods: blogMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [blogPath]: BlogClientService
  }
}

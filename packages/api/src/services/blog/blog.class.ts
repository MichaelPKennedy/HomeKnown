import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Blog, BlogData, BlogPatch, BlogQuery } from './blog.schema'

export type { Blog, BlogData, BlogPatch, BlogQuery }

export interface BlogParams extends Params {
  query?: {}
}

export class BlogService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: BlogParams): Promise<Blog[] | Paginated<Blog>> {
    const { query } = params
    try {
      const result = await this.sequelize.models.BlogPost.findAll({ where: query })
      return result.map((post: any) => post.toJSON() as Blog)
    } catch (error) {
      throw new Error(`Error finding blog posts: ${error}`)
    }
  }

  async get(id: Id, params?: BlogParams): Promise<Blog> {
    try {
      const blogPost = await this.sequelize.models.BlogPost.findByPk(id)
      if (!blogPost) {
        throw new Error(`Blog post with ID ${id} not found`)
      }
      return blogPost.toJSON() as Blog
    } catch (error) {
      throw new Error(`Error getting blog post: ${error}`)
    }
  }

  async create(data: BlogData, params?: BlogParams): Promise<Blog> {
    try {
      const result = await this.sequelize.models.BlogPost.create(data)
      return result.toJSON() as Blog
    } catch (error) {
      throw new Error(`Error creating blog post: ${error}`)
    }
  }

  async update(id: NullableId, data: BlogData, params?: BlogParams): Promise<Blog> {
    if (id === null) {
      throw new Error('ID cannot be null for update')
    }
    try {
      const blogPost = await this.sequelize.models.BlogPost.findByPk(id)
      if (!blogPost) {
        throw new Error(`Blog post with ID ${id} not found`)
      }
      const result = await blogPost.update(data)
      return result.toJSON() as Blog
    } catch (error) {
      throw new Error(`Error updating blog post: ${error}`)
    }
  }
  async patch(id: NullableId, data: BlogPatch, params?: BlogParams): Promise<Blog> {
    if (id === null) {
      throw new Error('ID cannot be null for patch')
    }
    try {
      const blogPost = await this.sequelize.models.BlogPost.findByPk(id)
      if (!blogPost) {
        throw new Error(`Blog post with ID ${id} not found`)
      }
      const result = await blogPost.update(data)
      return result.toJSON() as Blog
    } catch (error) {
      throw new Error(`Error patching blog post: ${error}`)
    }
  }

  async remove(id: NullableId, params?: BlogParams): Promise<Blog> {
    if (id === null) {
      throw new Error('ID cannot be null for remove')
    }
    try {
      const blogPost = await this.sequelize.models.BlogPost.findByPk(id)
      if (!blogPost) {
        throw new Error(`Blog post with ID ${id} not found`)
      }
      await blogPost.destroy()
      return blogPost.toJSON() as Blog
    } catch (error) {
      throw new Error(`Error removing blog post: ${error}`)
    }
  }
}

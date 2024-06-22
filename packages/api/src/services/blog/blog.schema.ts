import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const blogSchema = Type.Object(
  {
    post_id: Type.Number(),
    title: Type.String(),
    category: Type.String(),
    content: Type.String(),
    author: Type.String(),
    created_at: Type.String(),
    updated_at: Type.String()
  },
  { $id: 'Blog', additionalProperties: false }
)
export type Blog = Static<typeof blogSchema>
export const blogValidator = getValidator(blogSchema, dataValidator)
export const blogResolver = resolve<Blog, HookContext>({})

export const blogExternalResolver = resolve<Blog, HookContext>({})

// Schema for creating new entries
export const blogDataSchema = Type.Object(
  {
    title: Type.String(),
    category: Type.String(),
    content: Type.String(),
    author: Type.String()
  },
  { $id: 'BlogData', additionalProperties: false }
)
export type BlogData = Static<typeof blogDataSchema>
export const blogDataValidator = getValidator(blogDataSchema, dataValidator)
export const blogDataResolver = resolve<Blog, HookContext>({})

// Schema for updating existing entries
export const blogPatchSchema = Type.Partial(blogDataSchema, {
  $id: 'BlogPatch'
})
export type BlogPatch = Static<typeof blogPatchSchema>
export const blogPatchValidator = getValidator(blogPatchSchema, dataValidator)
export const blogPatchResolver = resolve<Blog, HookContext>({})

// Schema for allowed query properties
export const blogQueryProperties = Type.Pick(blogSchema, ['post_id', 'title', 'category', 'author'])
export const blogQuerySchema = Type.Intersect(
  [
    querySyntax(blogQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BlogQuery = Static<typeof blogQuerySchema>
export const blogQueryValidator = getValidator(blogQuerySchema, queryValidator)
export const blogQueryResolver = resolve<BlogQuery, HookContext>({})

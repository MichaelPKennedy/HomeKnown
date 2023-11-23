// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const usersSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Users', additionalProperties: false }
)
export type Users = Static<typeof usersSchema>
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve<Users, HookContext>({})

export const usersExternalResolver = resolve<Users, HookContext>({})

// Schema for creating new entries
export const usersDataSchema = Type.Object(
  {
    username: Type.String({ maxLength: 50 }),
    password: Type.String({ maxLength: 100 }),
    primary_email: Type.Optional(Type.String({ maxLength: 50, format: 'email' }))
  },
  { $id: 'UsersData', additionalProperties: false }
)

export type UsersData = Static<typeof usersDataSchema>
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve<Users, HookContext>({})

// Schema for updating existing entries
export const usersPatchSchema = Type.Partial(usersSchema, {
  $id: 'UsersPatch'
})
export type UsersPatch = Static<typeof usersPatchSchema>
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve<Users, HookContext>({})

// Schema for allowed query properties
export const usersQueryProperties = Type.Pick(usersSchema, ['id', 'text'])
export const usersQuerySchema = Type.Intersect(
  [
    querySyntax(usersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UsersQuery = Static<typeof usersQuerySchema>
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve<UsersQuery, HookContext>({})

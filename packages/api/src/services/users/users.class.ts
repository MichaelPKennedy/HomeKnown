import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './users.schema'
export type { User, UserData, UserPatch, UserQuery }
import bcrypt from 'bcryptjs'

export interface UserParams extends Params {
  query?: { login: string; primary_email: string }
}

export class UserService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: UserParams) {
    const { primary_email } = params.query || {}
    const Users = this.sequelize.models.Users
    const user = await Users.findOne({
      where: {
        primary_email: primary_email
      }
    })
    if (user) {
      return { data: [user] }
    } else {
      return { data: [] }
    }
  }

  async get(id: Id, params?: UserParams): Promise<any> {
    const user = await this.sequelize.models.Users.findOne({
      where: { user_id: id }
    })

    if (!user) {
      throw new Error('User not found.')
    }

    const userObject = user.get({ plain: true })
    const hasPassword = !!userObject.password
    const { password, ...userWithoutPassword } = userObject
    userWithoutPassword.hasPassword = hasPassword

    return userWithoutPassword
  }

  async create(data: any, params?: UserParams): Promise<any> {
    const { username, password, primary_email, googleId, first_name, last_name } = data

    if (googleId) {
      const user = await this.sequelize.models.Users.create({
        googleId,
        primary_email,
        first_name,
        last_name
      })
      return user
    } else {
      // password is hashed automatically
      const user = await this.sequelize.models.Users.create({
        username,
        password,
        primary_email,
        first_name,
        last_name
      })

      const { password: _, ...userWithoutPassword } = user.get({ plain: true })
      return userWithoutPassword
    }
  }

  async update(id: NullableId, data: any, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(user_id: NullableId, data: any, params?: Params): Promise<any> {
    if (user_id === null) {
      throw new Error('No ID provided for patch operation')
    }

    const { currentPassword, newPassword, ...otherData } = data

    let t
    try {
      t = await this.sequelize.transaction()
      const user = await this.sequelize.models.Users.findOne({
        where: { user_id },
        transaction: t
      })

      if (!user) {
        await t.rollback()
        throw new Error('User not found.')
      }

      if (newPassword && !currentPassword) {
        otherData.password = await bcrypt.hash(newPassword, 10)
      } else if (currentPassword && newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
          await t.rollback()
          throw new Error('Current password is incorrect.')
        }

        const previousPasswords = await this.sequelize.models.PasswordHistory.findAll(
          {
            where: { user_id },
            order: [['createdAt', 'DESC']],
            limit: 4
          },
          { transaction: t }
        )

        for (let record of previousPasswords) {
          if (await bcrypt.compare(newPassword, record.passwordHash)) {
            await t.rollback()
            throw new Error('New password cannot match any of the last four passwords.')
          }
        }

        const newHash = await bcrypt.hash(newPassword, 10)

        try {
          await this.sequelize.models.PasswordHistory.create(
            {
              user_id,
              passwordHash: user.password
            },
            { transaction: t }
          )
        } catch (e) {
          console.log('e', e)
        }

        otherData.password = newHash
      }

      const [affectedRows] = await this.sequelize.models.Users.update(otherData, {
        where: { user_id },
        transaction: t
      })

      const updatedUser = await this.sequelize.models.Users.findOne({
        where: { user_id }
      })

      const userObject = updatedUser.get({ plain: true })
      const hasPassword = !!userObject.password
      const { password, ...userWithoutPassword } = userObject
      userWithoutPassword.hasPassword = hasPassword

      await t.commit()
      return userWithoutPassword
    } catch (error) {
      if (t) {
        await t.rollback()
      }
      throw error
    }
  }

  async remove(id: NullableId, params?: UserParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

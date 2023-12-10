// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import CustomStrategy from './customStrategy'
import { OAuthStrategy } from '@feathersjs/authentication-oauth'

import type { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}
interface GoogleProfile {
  id: string
  emails: [{ value: string }]
  photos: [{ value: string }]
}

export const authentication = (app: Application) => {
  const sequelize = app.get('sequelizeClient' as any)
  const authentication = new AuthenticationService(app)

  class GoogleStrategy extends OAuthStrategy {
    async getEntityData(profile: GoogleProfile, existingEntity: any, params: any) {
      // Extract data from the profile
      const baseData = await super.getEntityData(profile, existingEntity, params)

      // Return the extended data
      return {
        ...baseData,
        email: profile.emails[0].value,
        googleId: profile.id,
        profilePicture: profile.photos[0].value
      }
    }
  }

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new CustomStrategy(app, sequelize))
  authentication.register('google', new GoogleStrategy())

  app.use('authentication', authentication)
}

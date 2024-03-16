// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { JWTStrategy } from '@feathersjs/authentication'
import { AuthenticateService } from './services/authenticate/authenticate.class'
import CustomStrategy from './customStrategy'
import { OAuthStrategy, oauth } from '@feathersjs/authentication-oauth'
import GoogleStrategy from './googleStrategy'
import ApiKeyStrategy from './apiKeyStrategy'

import type { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticateService
  }
}
interface GoogleProfile {
  id: string
  emails: [{ value: string }]
  photos: [{ value: string }]
}

export const authentication = (app: Application) => {
  const sequelize = app.get('sequelizeClient' as any)
  const authentication = new AuthenticateService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new CustomStrategy(app, sequelize))
  authentication.register('google', new GoogleStrategy(app, sequelize))
  authentication.register('apiKey', new ApiKeyStrategy(app))

  app.use('authentication', authentication)
}

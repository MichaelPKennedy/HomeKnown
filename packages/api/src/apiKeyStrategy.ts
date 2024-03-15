import {
  AuthenticationBaseStrategy,
  AuthenticationResult,
  AuthenticationService,
  AuthenticationConfiguration
} from '@feathersjs/authentication'
import { NotAuthenticated } from '@feathersjs/errors'
import { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

interface ApiKeyConfig {
  allowedKeys: string
  header: string
}

interface CustomAuthenticationConfiguration {
  apiKey?: ApiKeyConfig
}

function isApiKeyConfig(config: any): config is ApiKeyConfig {
  return config && typeof config.allowedKeys === 'string' && typeof config.header === 'string'
}

class ApiKeyStrategy extends AuthenticationBaseStrategy {
  app: Application

  constructor(app: Application) {
    super()
    this.app = app
  }

  async authenticate(authentication: AuthenticationResult) {
    const config = this.app.get('authentication') as CustomAuthenticationConfiguration
    const { token } = authentication

    if (!config.apiKey || !isApiKeyConfig(config.apiKey) || config.apiKey.allowedKeys !== token) {
      throw new NotAuthenticated('Incorrect API Key')
    }

    return {
      apiKey: true
    }
  }
}

export default ApiKeyStrategy

import { AuthenticationService } from '@feathersjs/authentication'
import type { AuthenticationResult, AuthenticationParams } from '@feathersjs/authentication'

export class AuthenticateService extends AuthenticationService {
  async getPayload(authResult: AuthenticationResult, params: AuthenticationParams) {
    const payload = params.payload || {}

    const userId =
      authResult.user_id ||
      authResult.dataValues?.user_id ||
      authResult.users.user_id ||
      authResult.users.dataValues.user_id

    if (userId) {
      payload.sub = userId
    }

    return payload
  }
}

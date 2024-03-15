import { OAuthStrategy } from '@feathersjs/authentication-oauth'
import { Application, Params } from '@feathersjs/feathers'
import { AuthenticationResult, AuthenticationRequest } from '@feathersjs/authentication'
import _ from 'lodash'
import qs from 'qs'

import axios from 'axios'

interface GoogleProfile {
  id: string
  email: string
  name: string
  given_name: string
  family_name: string
  picture: string
}

interface User {
  id: number
  username: string
  primary_email: string
  first_name: string
  last_name: string
  password: string
}

class GoogleStrategy extends OAuthStrategy {
  app: Application
  sequelize: any
  entity: string
  constructor(app: Application, sequelizeClient: any) {
    super()
    this.app = app
    this.sequelize = sequelizeClient
    this.entity = 'users'
  }

  // Get the configuration for this strategy
  get configuration() {
    const config = super.configuration
    return config
  }

  // Get the Entity ID from the entity service
  get entityId() {
    return super.entityId
  }

  // Create a query to find the entity
  async getEntityQuery(profile: GoogleProfile, params: Params) {
    return {
      ...super.getEntityQuery(profile, params),
      primary_email: profile.email
    }
  }

  // Create the data used to create or update the user entity
  async getEntityData(profile: GoogleProfile, existingEntity: any, params: Params) {
    return {
      ...super.getEntityData(profile, existingEntity, params),
      primary_email: profile.email,
      googleId: profile.id,
      first_name: profile.given_name,
      last_name: profile.family_name
      // Add more fields as needed
    }
  }

  async getProfile(data: any, params: Params) {
    // Exchange the code for an access token
    const accessTokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code: data.code,
      client_id: this.configuration.clientID,
      client_secret: this.configuration.clientSecret,
      redirect_uri: this.configuration.callbackURL,
      grant_type: 'authorization_code'
    })

    // Throw an error if the token exchange failed
    if (accessTokenResponse.status !== 200) {
      throw new Error('Could not retrieve access token from Google')
    }

    const accessToken = accessTokenResponse.data.access_token

    // Use the access token to get the user's profile information
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    // Throw an error if fetching the profile failed
    if (profileResponse.status !== 200) {
      throw new Error('Could not retrieve user profile from Google')
    }

    // Return the profile data
    return profileResponse.data
  }

  // Get the current authenticated entity
  async getCurrentEntity(params: Params) {
    return super.getCurrentEntity(params)
  }

  // Get the allowed origin for redirects
  async getAllowedOrigin(params: Params) {
    return super.getAllowedOrigin(params)
  }

  async getRedirect(data: any, params: Params) {
    let redirectUrl
    if (process.env.NODE_ENV === 'production') {
      redirectUrl = 'https://www.homeknown.app/login'
    } else {
      redirectUrl = 'http://localhost:3000/login'
    }
    const { user_id } = data?.dataValues || {}
    const query = data?.accessToken
      ? { access_token: data.accessToken, user_id }
      : { error: 'OAuth Authentication not successful' }

    const separator = redirectUrl.endsWith('?') ? '' : '?'
    return `${redirectUrl}${separator}${qs.stringify(query)}`
  }

  // Find an entity
  async findEntity(profile: GoogleProfile, params: Params): Promise<User | null> {
    const query = await this.getEntityQuery(profile, params)
    const result = await this.app.service('users').find({
      ...params,
      query
    })
    const [entity = null] = result.data ? result.data : result

    return entity
  }

  async createEntity(profile: GoogleProfile, params: Params) {
    const data = await this.getEntityData(profile, null, params)

    return this.app.service('users').create(data)
  }

  // Update an entity
  async updateEntity(entity: any, profile: GoogleProfile, params: Params) {
    const id = entity.user_id
    const data = await this.getEntityData(profile, entity, params)

    return this.app.service('users').patch(id, data, _.omit(params, 'query'))
  }

  // Get an entity
  async getEntity(result: any, params: Params) {
    return super.getEntity(result, params)
  }

  // Authenticate
  async authenticate(authentication: AuthenticationRequest, originalParams: AuthenticationResult) {
    const entity = this.configuration.entity
    const { provider, ...params } = originalParams

    // This is where you call your getProfile method which should be properly implemented to return the user's profile
    const profile = await this.getProfile(authentication, params)

    // This is where you find or create the entity based on the profile
    const existingEntity = (await this.findEntity(profile, params)) || (await this.getCurrentEntity(params))

    // Depending on whether the entity exists, create a new one or update the existing one
    const authEntity = !existingEntity
      ? await this.createEntity(profile, params)
      : await this.updateEntity(existingEntity, profile, params)

    // The strategy name should always be a string and should match the name used when registering the strategy
    const strategyName = this.name

    // Construct the result with the proper structure as per the type definition
    const authResult = {
      authentication: { strategy: strategyName },
      // The rest of the `authEntity` properties would go here, depending on what your application needs.
      ...authEntity
    }

    // Return the result, making sure it matches the expected type
    return {
      authentication: { strategy: this.name },
      ...authResult
    }
  }
}

export default GoogleStrategy

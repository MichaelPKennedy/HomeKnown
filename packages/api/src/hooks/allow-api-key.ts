import { HookContext, NextFunction } from '@feathersjs/feathers'

export default () => async (context: HookContext, next: NextFunction) => {
  const { params, app } = context

  const headerField = app.get('authentication').apiKey.header
  const token = params.headers ? params.headers[headerField] : null

  if (token && params.provider && !params.authentication) {
    context.params = {
      ...params,
      authentication: {
        strategy: 'apiKey',
        token
      }
    }
  }

  return next()
}

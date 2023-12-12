import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { UserService } from '../users.class'

const googleAuthentication: Hook<Application, UserService> = async (
  context: HookContext<Application, UserService>
): Promise<HookContext<Application, UserService>> => {
  console.log('context result', context.result)
  return context
}

export default googleAuthentication

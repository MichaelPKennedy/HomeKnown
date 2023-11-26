import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { SurveyService } from '../survey.class'

const getHomeListings: Hook<Application, SurveyService> = async (
  context: HookContext<Application, SurveyService>
): Promise<HookContext<Application, SurveyService>> => {
  //TODO: Implement hook
  return context
}

export default getHomeListings

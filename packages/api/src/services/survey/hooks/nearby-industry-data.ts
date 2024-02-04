import { Hook, HookContext } from '@feathersjs/feathers'
import { Storage } from '@google-cloud/storage'
import { Application } from '../../../declarations'
import { SurveyService } from '../survey.class'

const nearbyIndustryData: Hook<Application, SurveyService> = async (
  context: HookContext<Application, SurveyService>
): Promise<HookContext<Application, SurveyService>> => {
  const cities = context.result?.topTen || context.result || []

  for (const city of cities) {
    console.log('city', city)
    //TODO: Check city.Jobs array city.selectedJobs, if any jobs are missing, call the industry GET method with nearby param set to true
  }
  return context
}

export default nearbyIndustryData

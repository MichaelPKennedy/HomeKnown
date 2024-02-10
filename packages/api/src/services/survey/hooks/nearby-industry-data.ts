import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { SurveyService } from '../survey.class'

const nearbyIndustryData: Hook<Application, SurveyService> = async (
  context: HookContext<Application, SurveyService>
): Promise<HookContext<Application, SurveyService>> => {
  const cities = context.result?.topTen || context.result || []
  for (const city of cities) {
    if (city?.Jobs.length > 0 || !city?.selectedJobs || city?.selectedJobs.length === 0) {
      continue
    }
    const { latitude, longitude, selectedJobs } = city

    const queryData = {
      nearby: true,
      selectedJobs,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    }

    try {
      const jobData = await context.app.service('industry').get(city.city_id, { query: queryData })
      city.Jobs = jobData
    } catch (error) {
      console.error('Error fetching industry data for city:', city.city_name, error)
    }
  }

  return context
}

export default nearbyIndustryData

import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { SurveyService } from '../survey.class'
interface CityPhoto {
  url: string
  navigationUrl: string
  alt: string
  blurHash: string
  attribution: {
    photographer: string
    photographerUrl: string
  }
}

interface CityData {
  city_name: string
  state_name: string
  city_id: number
  photos?: CityPhoto[]
}

const getCityPhoto: Hook<Application, SurveyService> = async (
  context: HookContext<Application, SurveyService>
): Promise<HookContext<Application, SurveyService>> => {
  const cities: CityData[] = context.result?.topTen || context.result || []

  await Promise.all(
    cities.map(async (city) => {
      const params = {
        query: {
          cityName: city.city_name,
          stateName: city.state_name,
          city_id: city.city_id
        }
      }
      try {
        const photos = await context.app.service('photos').find(params)
        city.photos = photos
      } catch (error) {
        console.error(`Failed to fetch photos for city ${city.city_name}:`, error)
        city.photos = []
      }
    })
  )

  return context
}

export default getCityPhoto

import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { RecommendationsService } from '../recommendations.class'
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
  cityName: string
  state: string
  cityId: number
  photos?: CityPhoto[]
}

const getCityPhoto: Hook<Application, RecommendationsService> = async (
  context: HookContext<Application, RecommendationsService>
): Promise<HookContext<Application, RecommendationsService>> => {
  const cities: CityData[] = context.result?.topTen || context.result || []

  await Promise.all(
    cities.map(async (city) => {
      const params = {
        query: {
          cityName: city.cityName,
          stateName: city.state,
          city_id: city.cityId
        }
      }
      try {
        const photos = await context.app.service('photos').find(params)
        city.photos = photos
      } catch (error) {
        console.error(`Failed to fetch photos for city ${city.cityName}:`, error)
        city.photos = []
      }
    })
  )

  return context
}

export default getCityPhoto

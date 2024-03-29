import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { CategoriesService } from '../categories.class'

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

interface CategoriesResult {
  [category: string]: CityData[]
}

const getCityPhoto: Hook<Application, CategoriesService> = async (
  context: HookContext<Application, CategoriesService>
): Promise<HookContext<Application, CategoriesService>> => {
  const categoriesResult: CategoriesResult = context.result

  for (const category of Object.keys(categoriesResult)) {
    const cities = categoriesResult[category]

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
  }

  return context
}

export default getCityPhoto

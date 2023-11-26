import { Hook, HookContext } from '@feathersjs/feathers'
import { Storage } from '@google-cloud/storage'
import { Application } from '../../../declarations'
import { SurveyService } from '../survey.class'

const getCityPhoto: Hook<Application, SurveyService> = async (
  context: HookContext<Application, SurveyService>
): Promise<HookContext<Application, SurveyService>> => {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '')
  const storage = new Storage({ credentials: credentials })
  const bucketName = 'city-photos'
  const bucket = storage.bucket(bucketName)

  const cities = context.result?.topTen ?? []

  for (const city of cities) {
    const prefix = `${city.city_id}-`
    const [files] = await bucket.getFiles({ prefix, maxResults: 1 })

    if (files.length > 0) {
      const photoUrl = `https://storage.googleapis.com/${bucketName}/${files[0].name}`
      city.photoUrl = photoUrl
    } else {
      city.photoUrl = null
    }
  }

  return context
}

export default getCityPhoto

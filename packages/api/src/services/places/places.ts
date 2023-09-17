import type { Application } from '../../declarations'
import { PlacesService } from './places.class'
import { placesPath, placesMethods } from './places.shared'
import { placesHooks } from './places.hooks'

export * from './places.class'
export * from './places.schema'

export const places = (app: Application) => {
  app.use(placesPath, new PlacesService(app), {
    methods: placesMethods,
    events: []
  })

  app.service(placesPath).hooks(placesHooks)
}

declare module '../../declarations' {
  interface ServiceTypes {
    [placesPath]: PlacesService
  }
}

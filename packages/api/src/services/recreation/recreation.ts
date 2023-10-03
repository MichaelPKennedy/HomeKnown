import type { Application } from '../../declarations'
import { RecreationService } from './recreation.class'
import { recreationPath, recreationMethods } from './recreation.shared'
import { recreationHooks } from './recreation.hooks'

export * from './recreation.class'
export * from './recreation.schema'

export const recreation = (app: Application) => {
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(recreationPath, new RecreationService(app, sequelizeClient), {
    methods: recreationMethods,
    events: []
  })
  app.service(recreationPath).hooks(recreationHooks)
}

declare module '../../declarations' {
  interface ServiceTypes {
    [recreationPath]: RecreationService
  }
}

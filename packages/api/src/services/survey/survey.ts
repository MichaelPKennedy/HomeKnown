import type { Application } from '../../declarations'
import { SurveyService } from './survey.class'
import { surveyPath, surveyMethods } from './survey.shared'
import { surveyHooks } from './survey.hooks'

export * from './survey.class'
export * from './survey.schema'

export const survey = (app: Application) => {
  const sequelizeClient = app.get('sequelizeClient' as any)
  app.use(surveyPath, new SurveyService(app, sequelizeClient), {
    methods: surveyMethods,
    events: []
  })
  app.service(surveyPath).hooks(surveyHooks)
}

declare module '../../declarations' {
  interface ServiceTypes {
    [surveyPath]: SurveyService
  }
}

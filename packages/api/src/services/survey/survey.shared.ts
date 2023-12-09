// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { SurveyData, SurveyPatch, SurveyService } from './survey.class'

export type { SurveyData, SurveyPatch }

export type SurveyClientService = Pick<SurveyService, (typeof surveyMethods)[number]>

export const surveyPath = 'survey'

export const surveyMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const surveyClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(surveyPath, connection.service(surveyPath), {
    methods: surveyMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [surveyPath]: SurveyClientService
  }
}

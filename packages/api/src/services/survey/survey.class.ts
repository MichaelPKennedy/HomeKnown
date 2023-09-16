// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Survey, SurveyData, SurveyPatch, SurveyQuery } from './survey.schema'

export type { Survey, SurveyData, SurveyPatch, SurveyQuery }

export interface SurveyParams extends KnexAdapterParams<SurveyQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SurveyService<ServiceParams extends Params = SurveyParams> extends KnexService<
  Survey,
  SurveyData,
  SurveyParams,
  SurveyPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'survey'
  }
}

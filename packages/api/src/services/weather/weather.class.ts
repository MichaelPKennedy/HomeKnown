// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Weather, WeatherData, WeatherPatch, WeatherQuery } from './weather.schema'

export type { Weather, WeatherData, WeatherPatch, WeatherQuery }

export interface WeatherParams extends KnexAdapterParams<WeatherQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class WeatherService<ServiceParams extends Params = WeatherParams> extends KnexService<
  Weather,
  WeatherData,
  WeatherParams,
  WeatherPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'weather'
  }
}

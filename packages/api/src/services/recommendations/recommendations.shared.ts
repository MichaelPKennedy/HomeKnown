// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Recommendations,
  RecommendationsData,
  RecommendationsPatch,
  RecommendationsQuery,
  RecommendationsService
} from './recommendations.class'

export type { Recommendations, RecommendationsData, RecommendationsPatch, RecommendationsQuery }

export type RecommendationsClientService = Pick<
  RecommendationsService,
  (typeof recommendationsMethods)[number]
>
export const recommendationsPath = 'recommendations'

export const recommendationsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const recommendationsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(recommendationsPath, connection.service(recommendationsPath), {
    methods: recommendationsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [recommendationsPath]: RecommendationsClientService
  }
}

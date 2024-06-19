import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { ForecastService } from '../forecast.class'

const isCrawler = (userAgent: string) => {
  const crawlers = [
    'googlebot',
    'bingbot',
    'yandex',
    'baiduspider',
    'duckduckbot',
    'slurp', // Yahoo
    'sogou',
    'exabot',
    'facebot',
    'ia_archiver'
  ]
  return crawlers.some((crawler) => userAgent.toLowerCase().includes(crawler))
}

const crawlers: Hook<Application, ForecastService> = async (
  context: HookContext<Application, ForecastService>
): Promise<HookContext<Application, ForecastService>> => {
  const userAgent = context.params.headers['user-agent']
  if (isCrawler(userAgent)) {
    context.params.isCrawler = true
  }

  return context
}

export default crawlers

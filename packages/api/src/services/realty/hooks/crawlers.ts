import { Hook, HookContext } from '@feathersjs/feathers'
import { Application } from '../../../declarations'
import { RealtyService } from '../realty.class'

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

const crawlers: Hook<Application, RealtyService> = async (
  context: HookContext<Application, RealtyService>
): Promise<HookContext<Application, RealtyService>> => {
  const userAgent = context.params.headers['user-agent']
  if (isCrawler(userAgent)) {
    context.params.isCrawler = true
  }

  return context
}

export default crawlers

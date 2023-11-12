import { app } from './app'
import { logger } from './logger'

// Heroku dynamically assigns a port via process.env.PORT
const port = process.env.PORT || app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection %O', reason)
})

app.listen(port, () => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})

import { app } from './app'
import { logger } from './logger'

// Heroku dynamically assigns a port via process.env.PORT
const port = process.env.PORT || app.get('port')
const host = app.get('host')

console.log('test')
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection %O', reason)
})
console.log('port', port)
console.log(process.env)

app.listen(port, () => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})

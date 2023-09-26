import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import { Sequelize } from 'sequelize'

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { services } from './services/index'
import { channels } from './channels'
import { OccupationModel } from '../models/occupation.model'
import { StateIndustrySalaryModel } from '../models/state-industry-salary.model'
import { StateModel } from '../models/state.model'
import { CityIndustrySalaryModel } from '../models/city-industry-salary.model'
import { AreaModel } from '../models/area.model'

const app: Application = express(feathers())

// Load app configuration
app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

const sequelizeConfig = app.get('sequelize' as any)
const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    port: parseInt(sequelizeConfig.port, 10),
    dialect: sequelizeConfig.dialect
  }
)
app.set('sequelizeClient' as any, sequelize)

// Initialize your model with this instance
OccupationModel(sequelize)
StateIndustrySalaryModel(sequelize)
StateModel(sequelize)
CityIndustrySalaryModel(sequelize)
AreaModel(sequelize)

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})

// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }

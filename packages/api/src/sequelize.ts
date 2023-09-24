import { Sequelize } from 'sequelize-typescript'
import { Application } from './declarations'

export const sequelizeService = (app: Application) => {
  const sequelize = new Sequelize({
    ...app.get('sequelize'),
    models: [__dirname + '/models'] // This tells Sequelize where to find your models
  })

  app.set('sequelizeClient', sequelize)
}

import { Sequelize } from 'sequelize-typescript'
import { Application } from '@feathersjs/feathers'

export const sequelizeService = (app: Application) => {
  const sequelizeConfig = app.get('sequelize') as unknown as Sequelize

  const sequelize = new Sequelize({
    ...sequelizeConfig,
    models: [__dirname + '/models']
  })

  app.set('sequelizeClient', sequelize)
}

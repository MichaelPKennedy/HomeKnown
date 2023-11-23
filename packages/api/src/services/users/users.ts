import type { Application } from '../../declarations'
import { UsersService } from './users.class'
import { usersPath, usersMethods } from './users.shared'
import { usersHooks } from './users.hooks'
import { Request, Response, NextFunction } from 'express'

export const users = (app: Application) => {
  const sequelizeClient = app.get('sequelizeClient' as any)
  const usersService = new UsersService(app, sequelizeClient)

  app.use(usersPath, usersService)

  // Initialize hooks
  app.service(usersPath).hooks(usersHooks)

  // custom login endpoint
  app.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = await usersService.login(req.body)
      res.json(accessToken)
    } catch (error: any) {
      res.status(401).json({ error: error.message })
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [usersPath]: UsersService
  }
}

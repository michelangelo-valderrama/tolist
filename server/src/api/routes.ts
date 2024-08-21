import type { Application } from 'express'
import { asyncHandler } from '../middlewares/api-utils'
import { ApiResponse } from '../utils/api-response'
import projects from './projects/router'
import users from './users/router'
import tasks from './tasks/router'
import tags from './tags/router'

const BASE_API_PATH = ''
const APP_START_TIME = Date.now()
const API_ROUTE_MAP = {
  '/projects': projects,
  '/tasks': tasks,
  '/users': users,
  '/tags': tags,
  '/status': asyncHandler(async () => new ApiResponse('ok')),
}

function addApiRouter(app: Application): void {
  app.get(
    '/',
    asyncHandler(async (_req, _res) => {
      return new ApiResponse('ok', {
        uptime: Date.now() - APP_START_TIME,
      })
    }),
  )

  Object.keys(API_ROUTE_MAP).forEach((route) => {
    const routePath = `${BASE_API_PATH}${route}`
    app.use(routePath, API_ROUTE_MAP[route as keyof typeof API_ROUTE_MAP])
  })

  app.use((req, res) => {
    return res.send(`Unknown request URL (${req.method}: ${req.path})`)
  })
}

export default addApiRouter

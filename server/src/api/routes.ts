import type { Application } from 'express'
import tasks from './tasks/routes'
import users from './users/routes'
import { asyncHandler } from '../middlewares/api-utils'
import { ApiResponse } from '../utils/api-response'

const BASE_API_PATH = ''
const APP_START_TIME = Date.now()
const API_ROUTE_MAP = {
	'/tasks': tasks,
	'/users': users
}

function addApiRouter(app: Application): void {
	app.get(
		'/',
		asyncHandler(async (_req, _res) => {
			return new ApiResponse('ok', {
				uptime: Date.now() - APP_START_TIME
			})
		})
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

import type { Application } from 'express'
import tasks from './tasks/routes'

const BASE_API_PATH = ''

const API_ROUTE_MAP = {
	'/tasks': tasks
}

function addApiRouter(app: Application): void {
	app.get('/', (req, res) => {
		return res.send('ok')
	})

	Object.keys(API_ROUTE_MAP).forEach((route) => {
		const routePath = `${BASE_API_PATH}${route}`
		app.use(routePath, API_ROUTE_MAP[route as keyof typeof API_ROUTE_MAP])
	})

	app.use((req, res) => {
		return res.send(`Unknown request URL (${req.method}: ${req.path})`)
	})
}

export default addApiRouter

import express, { urlencoded } from 'express'
import addApiRouter from './api/routes'

function buildApp(): express.Application {
	const app = express()

	app.use(urlencoded({ extended: true }))

	addApiRouter(app)

	return app
}

export default buildApp()

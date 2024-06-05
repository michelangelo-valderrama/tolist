import express, { urlencoded, json } from 'express'
import helmet from 'helmet'
import addApiRouter from './api/routes'
import errorHandlingMiddleware from './middlewares/error'

function buildApp(): express.Application {
	const app = express()

	app.use(urlencoded({ extended: true }))
	app.use(json())
	app.use(helmet())

	addApiRouter(app)

	app.use(errorHandlingMiddleware)

	return app
}

export default buildApp()

import express, { urlencoded, json } from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import addApiRouter from './api/routes'
import contextMiddleware from './middlewares/context'
import errorHandlingMiddleware from './middlewares/error'

function buildApp(): express.Application {
	const app = express()

	app.use(urlencoded({ extended: true }))
	app.use(cookieParser())
	app.use(helmet())
	app.use(json())

	app.use(contextMiddleware)

	addApiRouter(app)

	app.use(errorHandlingMiddleware)

	return app
}

export default buildApp()

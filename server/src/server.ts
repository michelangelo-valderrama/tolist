import { Server } from 'http'
import envs from './config/envs'
import db from './init/db'
import app from './app'
import Logger from './utils/logger'

async function bootServer(port: number): Promise<Server> {
	try {
		Logger.info(`Starting server in ${envs.MODE} mode...`)

		Logger.info(`Connecting to database ${envs.DB_NAME}...`)
		await db.connect()
		Logger.success('Connected to database')
	} catch (error) {
		Logger.error(error, 'Failed to boot server')
		return process.exit(1)
	}

	return app.listen(port, () => {
		console.log(`Server running on http://127.0.0.1:${port}`)
	})
}

void bootServer(envs.PORT)

import { Server } from 'http'
import envs from './config/envs'
import app from './app'

async function bootServer(port: number): Promise<Server> {
	try {
		// database connection
	} catch (error) {
		return process.exit(1)
	}

	return app.listen(port, () => {
		console.log(`Server running on http://127.0.0.1:${port}`)
	})
}

void bootServer(envs.PORT)

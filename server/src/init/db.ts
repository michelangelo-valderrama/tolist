import mongoose from 'mongoose'
import envs from '../config/envs'
import Logger from '../utils/logger'

async function connect(): Promise<void> {
	const { DB_URL, DB_NAME, DB_USERNAME, DB_PASSWORD } = envs

	const connectOptions: mongoose.ConnectOptions = {
		dbName: DB_NAME,
		auth: {
			password: DB_PASSWORD,
			username: DB_USERNAME
		},
		authSource: 'admin',
		serverSelectionTimeoutMS: 5000
	}

	for (let i = 0; i < 3; i++) {
		try {
			if (i > 0) Logger.warn('Retrying to connect to database...')
			await mongoose.connect(DB_URL, connectOptions)
		} catch (error) {
			if (i >= 2) {
				Logger.error(error, 'Failed to connect to database')
				return process.exit(1)
			}
		}
	}
}

async function close(): Promise<void> {
	await mongoose.disconnect()
}

const db = { connect, close }
export default db

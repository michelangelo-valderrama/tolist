import mongoose from 'mongoose'
import envs from '../config/envs'

async function connect(): Promise<void> {
	const { DB_URL, DB_NAME, DB_USERNAME, DB_PASSWORD } = envs

	try {
		await mongoose.connect(DB_URL, {
			dbName: DB_NAME,
			auth: {
				password: DB_PASSWORD,
				username: DB_USERNAME
			},
			authSource: 'admin'
		})
	} catch (error) {
		console.error('Error connecting to database:', error)
		process.exit(1)
	}
}

async function close(): Promise<void> {
	await mongoose.disconnect()
}

const db = { connect, close }
export default db

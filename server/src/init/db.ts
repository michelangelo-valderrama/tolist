import mongoose from 'mongoose'
import type { ApiTypes } from '../types/api-types'
import envs from '../config/envs'
import Logger from '../utils/logger'

async function connect(): Promise<void> {
  let dbUrl: string,
    dbName: string,
    dbUsername: string | undefined,
    dbPassword: string | undefined

  const { MODE, DB_NAME, DB_URL, DB_USERNAME, DB_PASSWORD } = envs

  if (MODE === 'test') {
    console.log('global.__MONGO_URI__', global.__MONGO_URI__)
    dbUrl = global.__MONGO_URI__
    dbName = DB_NAME
  } else {
    dbUrl = DB_URL
    dbName = DB_NAME
    dbUsername = DB_USERNAME
    dbPassword = DB_PASSWORD
  }

  const connectOptions: mongoose.ConnectOptions = {
    dbName,
    auth: {
      password: dbPassword,
      username: dbUsername
    },
    authSource: 'admin',
    serverSelectionTimeoutMS: 5000
  }

  for (let i = 0; i < 3; i++) {
    try {
      if (i > 0) Logger.warn('Retrying to connect to database...')

      const mongooseData = await mongoose.connect(dbUrl, connectOptions)
      if (mongooseData.connection.readyState === 1) break
    } catch (error) {
      if (i >= 2) {
        Logger.error(error, 'Failed to connect to database')
        return process.exit(1)
      }
    }
  }
}

function close(): Promise<void> {
  return mongoose.disconnect()
}

const db: ApiTypes.Db = { connect, close }
export default db

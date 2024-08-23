import { afterAll, beforeAll, afterEach, vi } from 'vitest'
import mongoose from 'mongoose'
import * as MongoDbMock from 'vitest-mongodb'

const collectionsForCleanUp = ['users']

beforeAll(async () => {
  await MongoDbMock.setup()

  await mongoose.connect(globalThis.__MONGO_URI__)

  vi.mock('../src/init/db', () => ({
    __esModule: true,
    close: () => {}
  }))

  vi.mock('../src/utils/logger', () => ({
    __esModule: true,
    default: {
      error: (...data: any[]) => console.error('[ERROR]', ...data),
      warn: (...data: any[]) => console.warn('[WARN]', ...data),
      info: (...data: any[]) => console.info('[INFO]', ...data),
      success: (...data: any[]) => console.info('[SUCCESS]', ...data),
      db: (...data: any[]) => console.info('[DB]', ...data)
    }
  }))
})

afterEach(async () => {
  if (globalThis.__MONGO_URI__) {
    await Promise.all(
      collectionsForCleanUp.map((collection) => {
        return mongoose.connection.db.collection(collection).deleteMany()
      })
    )
  }
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
  await MongoDbMock.teardown()

  vi.resetAllMocks()
})

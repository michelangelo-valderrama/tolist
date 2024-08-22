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
      error: console.error,
      warn: console.warn,
      info: console.info,
      success: console.info,
      db: console.info
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

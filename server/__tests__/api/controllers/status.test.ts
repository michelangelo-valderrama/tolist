import { expect, describe, it } from 'vitest'
import request from 'supertest'
import app from '../../../src/app'

const mockApp = request(app)

describe('check status', () => {
  it('status should be ok', async () => {
    const response = await mockApp.get('/status').expect(200)

    expect(response.body).toEqual({ message: 'ok', data: null })
  })
})

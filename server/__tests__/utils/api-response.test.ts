import { describe, it, expect } from 'vitest'
import { ApiResponse } from '../../src/utils/api-response'
import HTTP_STATUS from '../../src/constants/http-status'

describe('api-response', () => {
  it('be instantiated correctly', () => {
    const apiResponseOk = new ApiResponse(
      'my message',
      { txt: 'ok' },
      HTTP_STATUS.OK_200
    )

    const apiResponseBad = new ApiResponse(
      'my message',
      { txt: 'bad' },
      HTTP_STATUS.BAD_REQUEST_400
    )

    expect(apiResponseOk.message).toBe('my message')
    expect(apiResponseOk.data).toEqual({ txt: 'ok' })
    expect(apiResponseOk.status).toBe(HTTP_STATUS.OK_200)

    expect(apiResponseBad.message).toBe('my message')
    expect(apiResponseBad.data).toEqual({ txt: 'bad' })
    expect(apiResponseBad.status).toBe(HTTP_STATUS.BAD_REQUEST_400)
  })
})

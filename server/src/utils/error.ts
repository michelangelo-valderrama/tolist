import HTTP_STATUS from '../constants/http-status'
import { isDev } from './misc'

class ApiError extends Error {
  status: number
  data?: any

  constructor(status: number, message?: string, data?: any, stack?: string) {
    super()
    this.status = status ?? HTTP_STATUS.INTERNAL_SERVER_ERROR_500
    this.data = data ?? null
    this.stack = stack

    const $message = message?.at(-1)?.includes('.') ? message : message + '.'

    if (isDev()) {
      this.message =
        (stack ?? '') ? `${$message}\nStack: ${stack}` : `${$message}`
    } else {
      // TODO
    }
  }
}

export default ApiError

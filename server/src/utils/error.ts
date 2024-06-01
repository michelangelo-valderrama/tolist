import HTTP_STATUS from '../constants/http-status'
import { isDev } from './misc'

class ApiError extends Error {
	status: number
	id?: string

	constructor(status: number, message?: string, stack?: string, id?: string) {
		super()
		this.status = status ?? HTTP_STATUS.INTERNAL_SERVER_ERROR
		this.stack = stack
		this.id = id

		if (isDev()) {
			this.message = stack ?? '' ? `${message}\nStack: ${stack}` : `${message}`
		} else {
			// TODO
		}
	}
}

export default ApiError

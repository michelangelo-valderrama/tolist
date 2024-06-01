import type { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '../constants/http-status'
import { ApiResponse, handleApiResponse } from '../utils/api-response'
import ApiError from '../utils/error'
import Logger from '../utils/logger'
import { isDev } from '../utils/misc'

async function errorHandlingMiddleware(
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
): Promise<void> {
	try {
		const apiResponse = new ApiResponse()
		apiResponse.status = HTTP_STATUS.INTERNAL_SERVER_ERROR

		// TODO: Database error handling
		if (error instanceof ApiError) {
			apiResponse.message = error.message
			apiResponse.status = error.status
		} else {
			apiResponse.message = 'Something went wrong. Please try again later.'
		}

		if (isDev()) {
			Logger.error(error, 'API error.')
		}

		return handleApiResponse(apiResponse, res)
	} catch (error) {
		Logger.error(error, 'Error handling middleware failed.')
	}

	return handleApiResponse(
		new ApiResponse(
			'Something went wrong.',
			undefined,
			HTTP_STATUS.INTERNAL_SERVER_ERROR
		),
		res
	)
}

export default errorHandlingMiddleware

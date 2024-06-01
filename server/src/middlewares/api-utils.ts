import type { RequestHandler, Request, Response, NextFunction } from 'express'
import { type ApiResponse, handleApiResponse } from '../utils/api-response'

type AsyncHandler = (req: Request, res?: Response) => Promise<ApiResponse>

/**
 * Wraps an async handler to catch errors and send them to the error handler.
 */
function asyncHandler(handler: AsyncHandler): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const handlerData = await handler(req, res)
			return handleApiResponse(handlerData, res)
		} catch (error) {
			next(error)
		}
	}
}

export { asyncHandler }

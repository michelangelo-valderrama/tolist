import type { NextFunction, Response } from 'express'
import { ApiTypes } from '../types/api-types'
import { verifyAccessToken } from '../utils/auth'
import ApiError from '../utils/error'
import HTTP_STATUS from '../constants/http-status'

function authenticateReq() {
	return (req: ApiTypes.Request, _res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return next(
				new ApiError(HTTP_STATUS.FORBIDDEN_403, 'Missing authorization header')
			)
		}

		const token = authHeader && authHeader.split(' ')[1]
		if (!token) {
			return next(new ApiError(HTTP_STATUS.FORBIDDEN_403, 'No token provided'))
		}

		let decodedToken

		try {
			decodedToken = verifyAccessToken(token)
		} catch (error) {
			return next(new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Invalid token'))
		}

		req.ctx = { decodedToken }
		next()
	}
}

export { authenticateReq }

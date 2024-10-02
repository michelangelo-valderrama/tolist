import type { NextFunction, Response } from 'express'
import type { ApiTypes } from '../types/api-types'
import { verifyAccessToken } from '../utils/auth'
import ApiError from '../utils/error'
import HTTP_STATUS from '../constants/http-status'
import * as usersService from '../api/users/service'

function authenticateReq() {
  return async (req: ApiTypes.Request, _res: Response, next: NextFunction) => {
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

    let decodedToken: ApiTypes.AccessTokenPayload

    try {
      decodedToken = await verifyAccessToken(token)
      console.log('decodedToken', decodedToken)
    } catch (error) {
      return next(
        new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Invalid access token')
      )
    }

    const userSecret = await usersService.getSecret(decodedToken.user_id)

    if (decodedToken.secret != userSecret) {
      return next(
        new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Invalid secret token')
      )
    }

    req.ctx = { decodedToken }

    next()
  }
}

export { authenticateReq }

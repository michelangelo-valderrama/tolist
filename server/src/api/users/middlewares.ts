import type { NextFunction, RequestHandler, Response } from 'express'
import type { ApiTypes } from '../../types/api-types'
import HTTP_STATUS from '../../constants/http-status'
import ApiError from '../../utils/error'
import { comparePassword } from '../../utils/auth'
import * as usersService from './service'
import type { User } from './schemas'

export function verifyCredentials(): RequestHandler {
  return async (req: ApiTypes.Request, _res: Response, next: NextFunction) => {
    const { password, name } = req.body

    let user: User
    try {
      user = await usersService.findByName(name)
    } catch (error) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Incorrect name'))
    }

    const validPassword = comparePassword(password, user.hashed_password)
    if (!validPassword) {
      return next(
        new ApiError(HTTP_STATUS.UNAUTHORIZED_401, 'Incorrect password')
      )
    }

    req.body.user = user
    next()
  }
}

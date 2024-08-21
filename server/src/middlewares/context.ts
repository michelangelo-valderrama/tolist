import type { Response, NextFunction } from 'express'
import type { ApiTypes } from '../types/api-types'

async function contextMiddleware(
  req: ApiTypes.Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  req.ctx = {
    decodedToken: {
      user_id: '',
      secret: '',
      exp: 0,
      iat: 0
    }
  }
  next()
}

export default contextMiddleware

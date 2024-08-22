import type { RequestHandler, Request, Response, NextFunction } from 'express'
import z from 'zod'
import type { ApiTypes } from '../types/api-types'
import { type ApiResponse, handleApiResponse } from '../utils/api-response'
import HTTP_STATUS from '../constants/http-status'
import ApiError from '../utils/error'

type AsyncHandler = (
  req: ApiTypes.Request,
  res: Response
) => Promise<ApiResponse>

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

type AnyZodObject = z.ZodOptional<z.AnyZodObject> | z.AnyZodObject

type ValidationSchema = z.ZodObject<{
  body?: AnyZodObject
  query?: AnyZodObject
  params?: AnyZodObject
  headers?: AnyZodObject
}>

/**
 * Validates the request body, query, params, and headers using the provided schema.
 */
function validateReq(validationSchema: ValidationSchema): RequestHandler {
  return async (req: ApiTypes.Request, _res: Response, next: NextFunction) => {
    try {
      await validationSchema.parseAsync(req)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorData = error.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
          expected: (e as any).expected ?? null,
          received: (e as any).received ?? null
        }))
        const errorMessage = 'Invalid request data.'

        return next(
          new ApiError(HTTP_STATUS.BAD_REQUEST_400, errorMessage, errorData)
        )
      }
      return next(error)
    }

    next()
  }
}

export { asyncHandler, validateReq }

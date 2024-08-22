import type { Response } from 'express'
import HTTP_STATUS from '../constants/http-status'
import Logger from './logger'

export class ApiResponse {
  message: string
  data: any
  status: number

  constructor(message?: string, data?: any, status = HTTP_STATUS.OK_200) {
    this.message = message ?? 'ok'
    this.data = data ?? null
    this.status = status
  }
}

export function handleApiResponse(
  apiResponse: ApiResponse,
  res: Response
): void {
  const { message, data, status } = apiResponse

  res.status(status)

  // @ts-ignore
  res.apiMessage = message
  Logger.info(message)

  /* if ([301, 302].includes(status)) {
		return res.redirect(data)
	} */

  res.json({ message, data })
}

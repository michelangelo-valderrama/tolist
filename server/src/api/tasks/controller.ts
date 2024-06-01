import { Request } from 'express'
import { ApiResponse } from '../../utils/api-response'
import ApiError from '../../utils/error'
import HTTP_STATUS from '../../constants/http-status'

export async function getTasks(_req: Request): Promise<ApiResponse> {
	throw new ApiError(HTTP_STATUS.NOT_IMPLEMENTED, 'Not implemented')
	return new ApiResponse('ok')
}

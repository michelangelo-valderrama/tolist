import HTTP_STATUS from '../../constants/http-status'
import type { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import * as tasksService from './service'

export async function getTasks(_req: ApiTypes.Request): Promise<ApiResponse> {
	const tasks = await tasksService.getTasks()
	return new ApiResponse('Tasks retreived', tasks)
}

export async function addTask(req: ApiTypes.Request): Promise<ApiResponse> {
	const task = await tasksService.addTask(req.body)
	return new ApiResponse('Task added', task, HTTP_STATUS.CREATED_201)
}

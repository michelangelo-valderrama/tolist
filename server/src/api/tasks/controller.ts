import HTTP_STATUS from '../../constants/http-status'
import type { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import { TaskCreate, TaskCreatePublic } from './schemas'
import * as tasksService from './service'

export async function findByCreator(
	req: ApiTypes.Request
): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id

	const tasks = await tasksService.findByCreator(userId)
	return new ApiResponse('Tasks retreived', tasks)
}

export async function addTask(req: ApiTypes.Request): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id

	const taskCreatePublic: TaskCreatePublic = req.body
	const taskCreate: TaskCreate = {
		...taskCreatePublic,
		creator: userId
	}

	const task = await tasksService.addTask(taskCreate)
	return new ApiResponse('Task added', task, HTTP_STATUS.CREATED_201)
}

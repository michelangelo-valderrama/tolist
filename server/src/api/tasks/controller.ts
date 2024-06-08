import HTTP_STATUS from '../../constants/http-status'
import type { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import ApiError from '../../utils/error'
import * as projectsService from '../projects/service'
import { TaskCreate, TaskCreatePublic, TaskUpdate } from './schemas'
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

	const project = await projectsService.getProject(taskCreate.project)
	if (!project) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST_400, 'Project not found')
	}

	const task = await tasksService.addTask(taskCreate)
	return new ApiResponse('Task added', task, HTTP_STATUS.CREATED_201)
}

export async function toggleTaskDone(
	req: ApiTypes.Request
): Promise<ApiResponse> {
	const taskId = req.params.taskId

	const task = await tasksService.toggleTaskDone(taskId)
	return new ApiResponse('Task updated', task)
}

export async function updateTask(req: ApiTypes.Request): Promise<ApiResponse> {
	const taskId = req.params.taskId
	const taskUpdate: TaskUpdate = req.body

	const task = await tasksService.updateTask(taskId, taskUpdate)
	return new ApiResponse('Task updated', task)
}

export async function deleteTask(req: ApiTypes.Request): Promise<ApiResponse> {
	const taskId = req.params.taskId

	await tasksService.deleteTask(taskId)
	return new ApiResponse('Task deleted')
}

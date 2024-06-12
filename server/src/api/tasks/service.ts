import HTTP_STATUS from '../../constants/http-status'
import ApiError from '../../utils/error'
import * as contextsService from '../contexts/service'
import TaskModel from './model'
import { Task, TaskCreate, TaskUpdate } from './schemas'

export async function addTask(taskCreate: TaskCreate): Promise<Task> {
	if (taskCreate.contexts) {
		for (const context of taskCreate.contexts) {
			if (!(await contextsService.contextExists(context))) {
				throw new ApiError(
					HTTP_STATUS.BAD_REQUEST_400,
					`Context ${context} does not exist`
				)
			}
		}
	}
	return Task.new(await TaskModel.create(taskCreate))
}

export async function findByCreator(creatorId: string): Promise<Task[]> {
	const tasks = await TaskModel.find({ creator: creatorId })
		.sort({ created_at: -1 })
		.lean()
		.exec()
	return tasks.map(Task.new)
}

export async function updateTask(
	taskId: string,
	taskUpdate: TaskUpdate
): Promise<Task> {
	if (taskUpdate.contexts) {
		for (const context of taskUpdate.contexts) {
			if (!(await contextsService.contextExists(context))) {
				throw new ApiError(
					HTTP_STATUS.BAD_REQUEST_400,
					`Context ${context} does not exist`
				)
			}
		}
	}
	const task = await TaskModel.findByIdAndUpdate(taskId, taskUpdate, {
		new: true
	})
		.lean()
		.exec()
	if (!task) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Task not found')
	}
	return Task.new(task)
}

export async function deleteContextFromTasks(
	contextName: string
): Promise<void> {
	await TaskModel.updateMany(
		{ contexts: contextName },
		{ $pull: { contexts: contextName } }
	).exec()
}

export async function deleteTask(taskId: string): Promise<void> {
	const task = await TaskModel.findByIdAndDelete(taskId).lean().exec()
	if (!task) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Task not found')
	}
}

export async function deleteByProject(projectId: string): Promise<void> {
	await TaskModel.deleteMany({ project: projectId }).exec()
}

export async function getTask(taskId: string): Promise<Task> {
	const task = await TaskModel.findById(taskId).lean().exec()
	if (!task) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Task not found')
	}
	return Task.new(task)
}

export async function findByProject(projectId: string): Promise<Task[]> {
	const tasks = await TaskModel.find({ project: projectId })
		.sort({ created_at: -1 })
		.lean()
		.exec()
	return tasks.map(Task.new)
}

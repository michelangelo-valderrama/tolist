import HTTP_STATUS from '../../constants/http-status'
import ApiError from '../../utils/error'
import TaskModel from './model'
import { Task, TaskCreate, TaskUpdate } from './schemas'

export async function addTask(taskCreate: TaskCreate): Promise<Task> {
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

export async function deleteTask(taskId: string): Promise<void> {
	const task = await TaskModel.findByIdAndDelete(taskId).lean().exec()
	if (!task) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Task not found')
	}
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

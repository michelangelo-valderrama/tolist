import TaskModel from './model'
import { Task, TaskCreate } from './schemas'

export async function getTasks(): Promise<Task[]> {
	return (await TaskModel.find()).map(Task.new)
}

export async function addTask(taskCreate: TaskCreate): Promise<Task> {
	return Task.new(await TaskModel.create(taskCreate))
}

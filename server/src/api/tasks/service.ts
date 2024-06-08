import TaskModel from './model'
import { Task, TaskCreate } from './schemas'

export async function addTask(taskCreate: TaskCreate): Promise<Task> {
	return Task.new(await TaskModel.create(taskCreate))
}

export async function findByCreator(creatorId: string): Promise<Task[]> {
	return (await TaskModel.find({ creator: creatorId }).lean().exec()).map(
		Task.new
	)
}

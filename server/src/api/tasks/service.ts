import HTTP_STATUS from '../../constants/http-status'
import ApiError from '../../utils/error'
import * as tagsService from '../tags/service'
import TaskModel from './model'
import { Task, TaskCreate, TaskUpdate } from './schemas'

export async function addTask(taskCreate: TaskCreate): Promise<Task> {
  if (taskCreate.tags) {
    for (const tag of taskCreate.tags) {
      if (!(await tagsService.tagExists(tag))) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST_400,
          `Tag ${tag} does not exist`
        )
      }
    }
  }
  return Task.new(await TaskModel.create(taskCreate))
}

export async function findByCreator(creatorId: string): Promise<Task[]> {
  const tasks = await TaskModel.find({ creator: creatorId })
    .sort({ created_at: -1 })
    .populate('tags')
    .lean()
    .exec()
  return tasks.map(Task.new)
}

export async function updateTask(
  taskId: string,
  taskUpdate: TaskUpdate
): Promise<Task> {
  if (taskUpdate.tags) {
    for (const tagId of taskUpdate.tags) {
      if (!(await tagsService.tagExists(tagId))) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST_400,
          `Tag ${tagId} does not exist`
        )
      }
    }
  }
  const task = await TaskModel.findByIdAndUpdate(taskId, taskUpdate, {
    new: true
  })
    .populate('tags')
    .lean()
    .exec()
  if (!task) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Task not found')
  }
  return Task.new(task)
}

export async function deleteTagFromTasks(tagId: string): Promise<void> {
  await TaskModel.updateMany({ tags: tagId }, { $pull: { tags: tagId } }).exec()
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
  const task = await TaskModel.findById(taskId).populate('tags').lean().exec()
  if (!task) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Task not found')
  }
  return Task.new(task)
}

export async function findByProject(projectId: string): Promise<Task[]> {
  const tasks = await TaskModel.find({ project: projectId })
    .sort({ created_at: -1 })
    .populate('tags')
    .lean()
    .exec()
  return tasks.map(Task.new)
}

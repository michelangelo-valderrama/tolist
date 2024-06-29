import ApiError from '../../utils/error'
import HTTP_STATUS from '../../constants/http-status'
import * as tasksService from '../tasks/service'
import TagModel from './model'
import { Tag, TagCreate } from './schemas'

export async function addTag(tagCreate: TagCreate): Promise<Tag> {
  const tag = await TagModel.create(tagCreate)
  return Tag.new(tag)
}

export async function getTag(name: string): Promise<Tag> {
  const tag = await TagModel.findOne({ name: name }).lean().exec()
  if (!tag) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Tag not found')
  }
  return Tag.new(tag)
}

export async function findByCreator(creatorId: string): Promise<Tag[]> {
  const tags = await TagModel.find({ creator: creatorId }).lean().exec()
  return tags.map(Tag.new)
}

export async function findByNames(names: string[]): Promise<Tag[]> {
  const tags = await TagModel.find({ name: { $in: names } })
    .lean()
    .exec()
  return tags.map(Tag.new)
}

export async function tagExists(name: string): Promise<boolean> {
  const tag = await TagModel.findOne({ name: name }).lean().exec()
  return !!tag
}

export async function deleteTag(name: string): Promise<void> {
  const tag = await TagModel.findOne({
    name: name
  }).exec()
  if (!tag) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Tag not found')
  }
  await Promise.all([
    tasksService.deleteTagFromTasks(name),
    tag.deleteOne().exec()
  ])
}

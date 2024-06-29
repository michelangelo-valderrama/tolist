import ApiError from '../../utils/error'
import HTTP_STATUS from '../../constants/http-status'
import * as tasksService from '../tasks/service'
import TagModel from './model'
import { Tag, TagCreate } from './schemas'

export async function addTag(tagCreate: TagCreate): Promise<Tag> {
  const tag = await TagModel.create(tagCreate)
  return Tag.new(tag)
}

export async function getTag(tagId: string): Promise<Tag> {
  const tag = await TagModel.findById(tagId).lean().exec()
  if (!tag) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Tag not found')
  }
  return Tag.new(tag)
}

export async function findByCreator(creatorId: string): Promise<Tag[]> {
  const tags = await TagModel.find({ creator: creatorId }).lean().exec()
  return tags.map(Tag.new)
}

export async function findByIds(tagsIds: string[]): Promise<Tag[]> {
  const tags = await TagModel.find({ _id: { $in: tagsIds } })
    .lean()
    .exec()
  return tags.map(Tag.new)
}

export async function tagExists(tagId: string): Promise<boolean> {
  const tag = await TagModel.findById(tagId).lean().exec()
  return !!tag
}

export async function deleteTag(tagId: string): Promise<void> {
  const tag = await TagModel.findById(tagId).exec()
  if (!tag) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND_404, 'Tag not found')
  }
  await Promise.all([
    tasksService.deleteTagFromTasks(tagId),
    tag.deleteOne().exec()
  ])
}

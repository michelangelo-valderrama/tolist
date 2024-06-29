import HTTP_STATUS from '../../constants/http-status'
import { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import * as tagsService from './service'
import { TagCreate, TagCreatePublic } from './schemas'

export async function addTask(req: ApiTypes.Request): Promise<ApiResponse> {
  const userId = req.ctx!.decodedToken.user_id

  const tagCreatePublic: TagCreatePublic = req.body
  const tagCreate: TagCreate = {
    ...tagCreatePublic,
    creator: userId
  }

  const tag = await tagsService.addTag(tagCreate)
  return new ApiResponse('Tag added', tag, HTTP_STATUS.CREATED_201)
}

export async function findByCreator(
  req: ApiTypes.Request
): Promise<ApiResponse> {
  const userId = req.ctx!.decodedToken.user_id

  const tags = await tagsService.findByCreator(userId)
  return new ApiResponse('Tags retreived', tags)
}

export async function getTag(req: ApiTypes.Request): Promise<ApiResponse> {
  const tagId = req.params.tagId

  const tag = await tagsService.getTag(tagId)
  return new ApiResponse('Tag retreived', tag)
}

export async function deleteTag(req: ApiTypes.Request): Promise<ApiResponse> {
  const tagId = req.params.tagId

  await tagsService.deleteTag(tagId)
  return new ApiResponse('Tag deleted')
}

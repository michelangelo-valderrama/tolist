import HTTP_STATUS from '../../constants/http-status'
import { ApiTypes } from '../../types/api-types'
import { ApiResponse } from '../../utils/api-response'
import * as contextsService from './service'
import { ContextCreate, ContextCreatePublic } from './schemas'

export async function addContext(req: ApiTypes.Request): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id

	const contextCreatePublic: ContextCreatePublic = req.body
	const contextCreate: ContextCreate = {
		...contextCreatePublic,
		creator: userId
	}

	const context = await contextsService.addContext(contextCreate)
	return new ApiResponse('Context added', context, HTTP_STATUS.CREATED_201)
}

export async function findByCreator(
	req: ApiTypes.Request
): Promise<ApiResponse> {
	const userId = req.ctx!.decodedToken.user_id

	const contexts = await contextsService.findByCreator(userId)
	return new ApiResponse('Contexts retreived', contexts)
}

export async function getContext(req: ApiTypes.Request): Promise<ApiResponse> {
	const contextName = req.params.contextName

	const context = await contextsService.getContext(contextName)
	return new ApiResponse('Context retreived', context)
}

import z from 'zod'
import { Router } from 'express'
import { authenticateReq } from '../../middlewares/auth'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import { idSchema } from '../../schemas/db'
import * as contextsController from './controller'
import { contextCreatePublicSchema } from './schemas'

const router = Router()

router.use(authenticateReq())

router.get('/', asyncHandler(contextsController.findByCreator))
router.get(
	'/:contextId',
	validateReq(
		z.object({
			params: z.object({
				contextId: idSchema
			})
		})
	),
	asyncHandler(contextsController.getContext)
)
router.post(
	'/',
	validateReq(
		z.object({
			body: contextCreatePublicSchema
		})
	),
	asyncHandler(contextsController.addContext)
)

export default router

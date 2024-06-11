import z from 'zod'
import { Router } from 'express'
import { authenticateReq } from '../../middlewares/auth'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import * as contextsController from './controller'
import { contextCreatePublicSchema, contextSchema } from './schemas'

const router = Router()

router.use(authenticateReq())

router.get('/', asyncHandler(contextsController.findByCreator))
router.get(
	'/:contextName',
	validateReq(
		z.object({
			params: z.object({
				contextName: z.string().min(1).max(10)
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

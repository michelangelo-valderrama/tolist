import z from 'zod'
import { Router } from 'express'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import { authenticateReq } from '../../middlewares/auth'
import * as tasksController from './controller'
import * as tasksSchemas from './schemas'

const router = Router()

router.get('/', authenticateReq(), asyncHandler(tasksController.findByCreator))
router.post(
	'/',
	authenticateReq(),
	validateReq(
		z.object({
			body: tasksSchemas.taskCreatePublicSchema
		})
	),
	asyncHandler(tasksController.addTask)
)

export default router

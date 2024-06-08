import z from 'zod'
import { Router } from 'express'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import { authenticateReq } from '../../middlewares/auth'
import { idSchema } from '../../schemas/db'
import * as tasksController from './controller'
import * as tasksSchemas from './schemas'

const router = Router()

router.use(authenticateReq())

router.get('/', asyncHandler(tasksController.findByCreator))
router.post(
	'/',
	validateReq(
		z.object({
			body: tasksSchemas.taskCreatePublicSchema
		})
	),
	asyncHandler(tasksController.addTask)
)
router.patch(
	'/:taskId',
	validateReq(
		z.object({
			params: z.object({ taskId: idSchema }),
			body: tasksSchemas.taskUpdateSchema
		})
	),
	asyncHandler(tasksController.updateTask)
)
router.delete(
	'/:taskId',
	validateReq(z.object({ params: z.object({ taskId: idSchema }) })),
	asyncHandler(tasksController.deleteTask)
)

export default router

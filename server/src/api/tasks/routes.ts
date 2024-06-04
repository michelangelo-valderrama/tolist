import { Router } from 'express'
import z from 'zod'
import { asyncHandler, validateRequest } from '../../middlewares/api-utils'
import * as tasksSchemas from './schemas'
import * as tasksController from './controller'

const router = Router()

router.get('/', asyncHandler(tasksController.getTasks))
router.post(
	'/',
	validateRequest(
		z.object({
			body: tasksSchemas.taskCreateSchema
		})
	),
	asyncHandler(tasksController.addTask)
)

export default router

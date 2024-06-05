import { Router } from 'express'
import z from 'zod'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import * as tasksController from './controller'
import * as tasksSchemas from './schemas'

const router = Router()

router.get('/', asyncHandler(tasksController.getTasks))
router.post(
	'/',
	validateReq(
		z.object({
			body: tasksSchemas.taskCreateSchema
		})
	),
	asyncHandler(tasksController.addTask)
)

export default router

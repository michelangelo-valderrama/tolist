import z from 'zod'
import { Router } from 'express'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import { authenticateReq } from '../../middlewares/auth'
import * as projectController from './controller'
import * as projectsSchemas from './schemas'
import { idSchema } from '../../schemas/db'

const router = Router()

router.use(authenticateReq())

router.get('/', asyncHandler(projectController.findByCreator))
router.post(
	'/',
	validateReq(
		z.object({
			body: projectsSchemas.projectCreatePublicSchema
		})
	),
	asyncHandler(projectController.addProject)
)
router.delete(
	'/:projectId',
	validateReq(
		z.object({
			params: z.object({ projectId: idSchema })
		})
	),
	asyncHandler(projectController.deleteProject)
)
router.patch(
	'/:projectId',
	validateReq(
		z.object({
			params: z.object({ projectId: idSchema }),
			body: projectsSchemas.projectUpdateSchema
		})
	),
	asyncHandler(projectController.updateProject)
)

export default router

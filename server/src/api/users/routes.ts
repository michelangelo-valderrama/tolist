import { Router } from 'express'
import z from 'zod'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import * as usersController from './controller'
import * as usersSchemas from './schemas'
import { authenticateReq } from '../../middlewares/auth'

const router = Router()

router.get('/me', authenticateReq(), asyncHandler(usersController.getMe))
router.post(
	'/',
	validateReq(
		z.object({
			body: usersSchemas.userCreatePublicSchema
		})
	),
	asyncHandler(usersController.singup)
)
router.post(
	'/login',
	validateReq(
		z.object({
			body: usersSchemas.userLoginSchema
		})
	),
	asyncHandler(usersController.login)
)

export default router

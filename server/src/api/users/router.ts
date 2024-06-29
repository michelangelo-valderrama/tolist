import { Router } from 'express'
import z from 'zod'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import * as usersController from './controller'
import * as usersSchemas from './schemas'
import * as usersMiddlewares from './middlewares'
import { authenticateReq } from '../../middlewares/auth'

const router = Router()

router.post(
	'/signup',
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
	usersMiddlewares.verifyCredentials(),
	asyncHandler(usersController.login)
)
router.post('/refresh', asyncHandler(usersController.refreshToken))
router.get('/me', authenticateReq(), asyncHandler(usersController.getMe))

export default router

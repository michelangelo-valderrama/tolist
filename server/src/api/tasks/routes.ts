import { Router } from 'express'
import { asyncHandler } from '../../middlewares/api-utils'
import * as tasksController from './controller'

const router = Router()

router.get('/', asyncHandler(tasksController.getTasks))

export default router

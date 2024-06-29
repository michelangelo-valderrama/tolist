import z from 'zod'
import { Router } from 'express'
import { authenticateReq } from '../../middlewares/auth'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import * as tagsController from './controller'
import * as tagsSchemas from './schemas'

const router = Router()

router.use(authenticateReq())

router.get('/', asyncHandler(tagsController.findByCreator))
router.get(
  '/:name',
  validateReq(
    z.object({
      params: tagsSchemas.tagSchema.pick({ name: true })
    })
  ),
  asyncHandler(tagsController.getTag)
)
router.post(
  '/',
  validateReq(
    z.object({
      body: tagsSchemas.tagCreatePublicSchema
    })
  ),
  asyncHandler(tagsController.addTask)
)
router.delete(
  '/:name',
  validateReq(
    z.object({
      params: tagsSchemas.tagSchema.pick({ name: true })
    })
  ),
  asyncHandler(tagsController.deleteTag)
)

export default router

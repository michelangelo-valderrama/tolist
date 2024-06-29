import z from 'zod'
import { Router } from 'express'
import { authenticateReq } from '../../middlewares/auth'
import { asyncHandler, validateReq } from '../../middlewares/api-utils'
import * as tagsController from './controller'
import * as tagsSchemas from './schemas'
import { idSchema } from '../../schemas/db'

const router = Router()

router.use(authenticateReq())

router.get('/', asyncHandler(tagsController.findByCreator))
router.get(
  '/:tagId',
  validateReq(
    z.object({
      params: z.object({ tagId: idSchema })
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
  '/:tagId',
  validateReq(
    z.object({
      params: z.object({ tagId: idSchema })
    })
  ),
  asyncHandler(tagsController.deleteTag)
)

export default router

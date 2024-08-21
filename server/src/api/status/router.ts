import { Router } from 'express'
import { asyncHandler } from '../../middlewares/api-utils'
import { ApiResponse } from '../../utils/api-response'

const router = Router()

router.get(
  '/',
  asyncHandler(async () => new ApiResponse('ok'))
)

export default router

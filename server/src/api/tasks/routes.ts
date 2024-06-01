import { Router } from 'express'
import { getTasks } from './controller'

const router = Router()

router.get('/', getTasks)

export default router

import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getLeads,
  getTasks,
  getUsers,
  getStats,
} from '../controllers/dashboardController.js'

const router = express.Router()

// All routes in this router are protected
router.use(protect)

router.get('/leads', getLeads)
router.get('/tasks', getTasks)
router.get('/users', getUsers)
router.get('/stats', getStats)

export default router

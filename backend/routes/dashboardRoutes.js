import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getLeads,
  getTasks,
  getUsers,
  getStats,
  createLead,
  deleteLead,
  createTask,
  deleteTask,
} from '../controllers/dashboardController.js'

const router = express.Router()

// All routes in this router are protected
router.use(protect)

router.get('/leads', getLeads)
router.post('/leads', createLead)
router.delete('/leads/:id', deleteLead)

router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.delete('/tasks/:id', deleteTask)

router.get('/users', getUsers)
router.get('/stats', getStats)

export default router

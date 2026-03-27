import express from 'express'
import { protect, authorize } from '../middleware/authMiddleware.js'
import {
  getLeads,
  getTasks,
  getUsers,
  getStats,
  createLead,
  updateLead,
  deleteLead,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/dashboardController.js'

const router = express.Router()

// All routes in this router are protected
router.use(protect)

// Lead routes
router.get('/leads', getLeads)
router.post('/leads', createLead)
router.patch('/leads/:id', updateLead)
router.delete('/leads/:id', deleteLead)

// Task routes
router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.patch('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)

// User routes (admin/manager only for list)
router.get('/users', authorize('admin', 'manager'), getUsers)
router.get('/stats', getStats)

export default router

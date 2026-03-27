import express from 'express'
import { login, register, changePassword } from '../controllers/authController.js'
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', loginLimiter, login)
router.post('/register', registerLimiter, register)
router.patch('/profile/password', protect, changePassword)

export default router

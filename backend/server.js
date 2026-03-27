import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET']
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])
if (missingEnvVars.length > 0) {
  console.error(`ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`)
  process.exit(1)
}

// Connect to database
connectDB()

const app = express()

// Security Middleware
app.use(helmet()) // Set security HTTP headers

// Logging Middleware
app.use(morgan('dev')) // Log HTTP requests

// CORS Middleware
const corsOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
)

// Body Parsing Middleware
app.use(express.json())

// Data Sanitization Middleware (prevent NoSQL injection)
app.use(mongoSanitize())

// Health check endpoint (includes DB connectivity)
const startTime = Date.now()
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    environment: process.env.NODE_ENV || 'development',
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' })
})

// Centralized error handler (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
})

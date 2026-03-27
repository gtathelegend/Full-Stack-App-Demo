import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
const corsOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
)
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Error handling for 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

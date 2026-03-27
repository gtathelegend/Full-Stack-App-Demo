/**
 * Centralized error handling middleware
 * Catches all errors and returns standardized response format
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
    return res.status(400).json({
      success: false,
      message: `Validation error: ${message}`,
    })
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    })
  }

  // MongoDB connection error
  if (err.name === 'MongooseError' || err.message?.includes('connect')) {
    return res.status(503).json({
      success: false,
      message: 'Database connection error',
    })
  }

  // Default error
  const status = err.status || err.statusCode || 500
  const message = err.message || 'Internal server error'

  res.status(status).json({
    success: false,
    message,
  })
}

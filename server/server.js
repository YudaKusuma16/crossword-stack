import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { testConnection, initializeDatabase } from './config/database.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.js'
import puzzleRoutes from './routes/puzzles.js'
import scoreRoutes from './routes/scores.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/puzzles', puzzleRoutes)
app.use('/api/scores', scoreRoutes)

// 404 handler
app.use(notFound)

// Error handler
app.use(errorHandler)

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    const connected = await testConnection()
    if (!connected) {
      console.error('Failed to connect to database')
      process.exit(1)
    }

    // Initialize database tables
    await initializeDatabase()

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app

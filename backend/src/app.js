import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import connectDb from './db'
import handleError from './middleware/error'
import auth from './middleware/auth'

// Import routes
import userRouter from './routers/users'
import tripRouter from './routers/trips'

// Initialize
const app = express()
connectDb(() => app.emit('ready'))
const port = process.env.PORT || 1337

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || 'http://localhost:3000',
  }),
)
app.use(cookieParser())

// Route middleware
app.use('/api/users', userRouter)
app.use('/api/trips', auth(), tripRouter)

// Error middleware
app.use(handleError)

app.on('ready', () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})

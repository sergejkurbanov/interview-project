import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import connectDb from './db'
import handleError from './middleware/error'

// Import routes
import userRouter from './routers/user'

// Initialize
const app = express()
connectDb(() => app.emit('ready'))
const port = process.env.PORT

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())

// Route middleware
app.use('/api/users', userRouter)

// Error middleware
app.use(handleError)

app.on('ready', () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import handleError from '../api/middleware/error'
import auth from '../api/middleware/auth'
import userRouter from '../api/routers/users'
import tripRouter from '../api/routers/trips'
import config from '../config'

export default ({ app }) => {
  // Middleware
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(
    cors({
      credentials: true,
      origin: config.origin,
    }),
  )
  app.use(cookieParser())

  // Routes
  app.use('/api/users', userRouter)
  app.use('/api/trips', auth(), tripRouter)

  // Error handling middleware
  app.use(handleError)
}

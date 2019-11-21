import express from 'express'
import User from '../models/User'
import auth from '../middleware/auth'
import ErrorHandler from '../helpers/error'

const router = express.Router()

// Public routes
router.post('/sign-up', async (req, res, next) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()

    res.status(201).send({ user, token })
  } catch (error) {
    next(new ErrorHandler(400, error.message))
  }
})

router.post('/log-in', async (req, res, next) => {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (error) {
    next(new ErrorHandler(400, error.message))
  }
})

// Protected routes
router.get('/me', auth, async (req, res) => {
  // Get the current user
  res.send(req.user)
})

router.post('/me/logout', auth, async (req, res, next) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)

    await req.user.save()

    res.send()
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
})

router.post('/me/logout-all', auth, async (req, res, next) => {
  // Log user out of all devices
  try {
    req.user.tokens = []

    await req.user.save()

    res.send()
  } catch (error) {
    next(new ErrorHandler(500, error.message))
  }
})

export default router

import express from 'express'
import User from '../models/User'
import ErrorHandler from '../helpers/error'
import auth from '../middleware/auth'

const router = express.Router()

// Public routes
router.post('/sign-up', async (req, res, next) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()

    res.status(201).send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error.errors))
  }
})

router.post('/log-in', async (req, res, next) => {
  // Login a registered user
  try {
    // Find the user by his credentials and generate his tokens
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    const [token, refreshToken] = await user.generateAuthTokens()

    res
      .cookie('token', token, { httpOnly: true })
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error.message))
  }
})

router.get('/refresh', async (req, res, next) => {
  try {
    // Get the user and clear his token
    const user = await User.findByTokenAndClearIt(req.cookies.refreshToken)
    // Generate new tokens
    const [token, newRefreshToken] = await user.generateAuthTokens()

    res
      .cookie('token', token, { httpOnly: true })
      .cookie('refreshToken', newRefreshToken, { httpOnly: true })
      .send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error.message))
  }
})

// Protected routes
router.post('/log-out', auth, async (req, res, next) => {
  try {
    // Clear the user's token
    await User.findByTokenAndClearIt(req.cookies.refreshToken)

    res
      .status(204)
      .clearCookie('token')
      .clearCookie('refreshToken')
      .send()
  } catch (error) {
    next(new ErrorHandler(400, error.message))
  }
})

router.get('/me', auth, async (req, res, next) => {
  try {
    // Get the current user and return it
    const user = await User.findOne({ _id: req.user.id })

    res.send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error.message))
  }
})

export default router

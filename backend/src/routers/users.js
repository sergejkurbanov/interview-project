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

    res.status(201).send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error.errors))
  }
})

router.post('/log-in', async (req, res, next) => {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    const [token, refreshToken] = await user.generateAuthTokens()

    res
      .cookie('token', token, { httpOnly: true })
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .send({ user })
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
      .send({ user })
  } catch (err) {
    next(new ErrorHandler(401, 'Not authorized to access this resource'))
  }
})

// Protected routes
router.post('/log-out', auth, async (req, res, next) => {
  try {
    // Clear the user's token
    User.findByTokenAndClearIt(req.cookies.refreshToken)

    res
      .clearCookie('token')
      .clearCookie('refreshToken')
      .send()
  } catch (err) {
    next(new ErrorHandler(401, 'Not authorized to access this resource'))
  }
})

export default router

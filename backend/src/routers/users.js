import express from 'express'
import User from '../models/User'
import ErrorHandler from '../helpers/error'
import roles from '../helpers/roles'
import auth from '../middleware/auth'

const router = express.Router()

// Public routes
router.post('/sign-up', async (req, res, next) => {
  // Create a new user
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password })
    await user.save()

    res.status(201).send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error))
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
    next(new ErrorHandler(400, error))
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
    next(new ErrorHandler(error.statusCode || 400, error))
  }
})

// Protected routes
router.post('/log-out', auth(), async (req, res, next) => {
  try {
    // Clear the user's token
    await User.findByTokenAndClearIt(req.cookies.refreshToken)

    res
      .clearCookie('token')
      .clearCookie('refreshToken')
      .sendStatus(204)
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

router.get('/me', auth(), async (req, res, next) => {
  try {
    // Get the current user and return it
    const user = await User.findOne({ _id: req.user.id })

    res.send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

// Role protected routes
router.get('/', auth([roles.MANAGER, roles.ADMIN]), async (req, res, next) => {
  try {
    // Get the current user and return it
    const users = await User.find()

    const omitTrips = req.user.role === roles.MANAGER

    res.send({ users: users.map(user => user.toClient(omitTrips)) })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

router.post('/', auth([roles.MANAGER, roles.ADMIN]), async (req, res, next) => {
  try {
    // Forbid non admin users to edit the user's trips
    if (req.body.trips && req.user.role !== roles.ADMIN) {
      throw new ErrorHandler(401, {
        message: 'Not authorized to access this resource',
      })
    }

    const user = new User(req.body)
    await user.save()

    res.status(201).send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

router.put(
  '/:id',
  auth([roles.MANAGER, roles.ADMIN]),
  async (req, res, next) => {
    try {
      // Do not allow password changes
      delete req.body.password

      // Forbid non admin users to edit the user's trips
      if (req.body.trips && req.user.role !== roles.ADMIN) {
        throw new ErrorHandler(401, {
          message: 'Not authorized to access this resource',
        })
      }

      // Find the user and pass it the update object
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
      )

      const omitTrips = req.user.role === roles.MANAGER

      res.send({ user: user.toClient(omitTrips) })
    } catch (error) {
      if (error.message.startsWith('E11000')) {
        next(new ErrorHandler(409, { message: 'Email already exists.' }))
      }
      next(new ErrorHandler(400, error))
    }
  },
)

router.delete(
  '/:id',
  auth([roles.MANAGER, roles.ADMIN]),
  async (req, res, next) => {
    try {
      // Find the user and pass it the update object
      await User.deleteOne({ _id: req.params.id })

      res.sendStatus(204)
    } catch (error) {
      next(new ErrorHandler(400, error))
    }
  },
)

export default router

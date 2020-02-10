import { Router } from 'express'
import userService from '../../services/userService'
import ErrorHandler from '../../helpers/error'
import roles from '../../helpers/roles'
import auth from '../middleware/auth'

const route = Router()

// Public routes
route.post('/sign-up', async (req, res, next) => {
  // Create a new user
  try {
    const user = await userService.signUp(req)

    res.status(201).send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.post('/log-in', async (req, res, next) => {
  // Login a registered user
  try {
    const { user, token, refreshToken } = await userService.logIn(req)

    res
      .cookie('token', token, { httpOnly: true })
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.get('/refresh', async (req, res, next) => {
  try {
    const { user, token, refreshToken } = await userService.refresh(req)

    res
      .cookie('token', token, { httpOnly: true })
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .send({ user })
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 400, error))
  }
})

// Protected routes
route.post('/log-out', auth(), async (req, res, next) => {
  try {
    await userService.logOut(req)

    res
      .clearCookie('token')
      .clearCookie('refreshToken')
      .sendStatus(204)
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.get('/me', auth(), async (req, res, next) => {
  try {
    const user = await userService.getMe(req)

    res.send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

// Role protected routes
route.get('/', auth([roles.MANAGER, roles.ADMIN]), async (req, res, next) => {
  try {
    const users = await userService.getUsers(req)

    res.send({ users })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.post('/', auth([roles.MANAGER, roles.ADMIN]), async (req, res, next) => {
  try {
    const user = await userService.createUser(req)

    res.status(201).send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.put(
  '/:id',
  auth([roles.MANAGER, roles.ADMIN]),
  async (req, res, next) => {
    try {
      const user = await userService.updateUser(req)

      res.send({ user })
    } catch (error) {
      if (error.message.startsWith('E11000')) {
        next(new ErrorHandler(409, { message: 'Email already exists.' }))
      }
      next(new ErrorHandler(400, error))
    }
  },
)

route.delete(
  '/:id',
  auth([roles.MANAGER, roles.ADMIN]),
  async (req, res, next) => {
    try {
      await userService.deleteUser(req)

      res.sendStatus(204)
    } catch (error) {
      next(new ErrorHandler(400, error))
    }
  },
)

export default route

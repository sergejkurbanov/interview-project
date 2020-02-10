import { Router } from 'express'
import tripService from '../../services/tripService'
import ErrorHandler from '../../helpers/error'
import roles from '../../helpers/roles'
import auth from '../middleware/auth'

const route = Router()

route.post('/', async (req, res, next) => {
  // Create a user trip
  try {
    const user = await tripService.createMyTrip(req)

    res.status(201).send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.delete('/:id', async (req, res, next) => {
  // Delete a user trip
  try {
    // Get the user from the db
    const user = await tripService.deleteMyTrip(req)

    res.send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.put('/:id', async (req, res, next) => {
  // Update a user trip
  try {
    const user = await tripService.updateMyTrip(req)

    res.send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

// Role protected routes
route.post('/:userId', auth([roles.ADMIN]), async (req, res, next) => {
  // Create a trip for a specific user
  try {
    const user = await tripService.createUserTrip(req)

    res.status(201).send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.put('/:userId/:tripId', auth([roles.ADMIN]), async (req, res, next) => {
  // Update a trip of a specific user
  try {
    const user = await tripService.updateUserTrip(req)

    res.send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

route.delete('/:userId/:tripId', async (req, res, next) => {
  // Delete a trip of a specific user
  try {
    const user = await tripService.deleteUserTrip(req)

    res.send({ user })
  } catch (error) {
    next(new ErrorHandler(400, error))
  }
})

export default route

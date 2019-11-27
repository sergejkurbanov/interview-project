import express from 'express'
import Trip from '../models/Trip'
import User from '../models/User'
import ErrorHandler from '../helpers/error'

const router = express.Router()

router.post('/', async (req, res, next) => {
  // Create a user trip
  try {
    // Validate trip dates
    Trip.validateDates(req.body.startDate, req.body.endDate)

    // Create a trip object
    const trip = new Trip(req.body)
    // Get the user from the db
    const user = await User.findOne({ _id: req.user.id })

    // Add the trip to his trips and save the user
    user.trips.push(trip)
    await user.save()

    res.status(201).send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error.message))
  }
})

router.delete('/:id', async (req, res, next) => {
  // Delete a user trip
  try {
    // Get the user from the db
    const user = await User.findOne({ _id: req.user.id })

    // Remove the trip to his trips and save the user
    user.trips.id(req.params.id).remove()
    await user.save()

    res.send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error.errors))
  }
})

router.put('/:id', async (req, res, next) => {
  // Update a user trip
  try {
    // Validate trip dates
    Trip.validateDates(req.body.startDate, req.body.endDate)

    // Get the user from the db and find the trip
    const user = await User.findOne({ _id: req.user.id })
    const trip = user.trips.id(req.params.id)

    // Update the trip and save the user
    trip.set(req.body)
    await user.save()

    res.send({ user: user.toClient() })
  } catch (error) {
    next(new ErrorHandler(400, error.errors))
  }
})

export default router

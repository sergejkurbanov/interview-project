import Trip from '../models/Trip'
import User from '../models/User'

const tripService = {
  createMyTrip: async req => {
    // Validate trip dates
    Trip.validateDates(req.body.startDate, req.body.endDate)

    // Create a trip object
    const trip = new Trip(req.body)
    // Get the current user from the db
    const user = await User.findOne({ _id: req.user.id })

    // Add the trip to his trips and save the user
    user.trips.push(trip)
    await user.save()

    return user.toClient()
  },
  deleteMyTrip: async req => {
    const user = await User.findOne({ _id: req.user.id })

    // Remove the trip from his trips and save the user
    user.trips.id(req.params.id).remove()
    await user.save()

    return user.toClient()
  },
  updateMyTrip: async req => {
    // Validate trip dates
    Trip.validateDates(req.body.startDate, req.body.endDate)

    // Get the user from the db and find the trip
    const user = await User.findOne({ _id: req.user.id })
    const trip = user.trips.id(req.params.id)
    if (!trip) throw new Error('You can not edit this trip.')

    // Update the trip and save the user
    trip.set(req.body)
    await user.save()

    return user.toClient()
  },
  createUserTrip: async req => {
    // Validate trip dates
    Trip.validateDates(req.body.startDate, req.body.endDate)

    // Create a trip object
    const trip = new Trip(req.body)
    // Get the user from the db
    const user = await User.findOne({ _id: req.params.userId })

    // Add the trip to his trips and save the user
    user.trips.push(trip)
    await user.save()

    return user.toClient()
  },
  updateUserTrip: async req => {
    // Validate trip dates
    Trip.validateDates(req.body.startDate, req.body.endDate)

    // Get the user from the db and find the trip
    const user = await User.findOne({ _id: req.params.userId })
    const trip = user.trips.id(req.params.tripId)
    if (!trip) throw new Error('You can not edit this trip.')

    // Update the trip and save the user
    trip.set(req.body)
    await user.save()

    return user.toClient()
  },
  deleteUserTrip: async req => {
    // Get the user from the db
    const user = await User.findOne({ _id: req.params.userId })

    // Remove the trip from his trips and save the user
    const trip = user.trips.id(req.params.tripId)
    trip.remove()
    await user.save()

    return user.toClient()
  },
}

export default tripService

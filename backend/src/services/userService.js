import User from '../models/User'
import roles from '../helpers/roles'
import ErrorHandler from '../helpers/error'

const userService = {
  signUp: async req => {
    // Create a new user based on supplied parameters
    const { name, email, password } = req.body
    const user = new User({ name, email, password })

    await user.save()

    return user.toClient()
  },
  logIn: async req => {
    // Find the user by his credentials and generate his tokens
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    const [token, refreshToken] = await user.generateAuthTokens()

    return { user: user.toClient(), token, refreshToken }
  },
  refresh: async req => {
    // Get the user and clear his token
    const user = await User.findByTokenAndClearIt(req.cookies.refreshToken)
    // Generate new tokens
    const [token, newRefreshToken] = await user.generateAuthTokens()

    return { user: user.toClient(), token, refreshToken: newRefreshToken }
  },
  logOut: async req => {
    // Clear the user's token
    await User.findByTokenAndClearIt(req.cookies.refreshToken)
  },
  getMe: async req => {
    // Get the current user and return it
    const user = await User.findOne({ _id: req.user.id })

    return user.toClient()
  },
  getUsers: async req => {
    // Get the current user and return it
    const users = await User.find()

    const shouldOmitTrips = req.user.role === roles.MANAGER

    return users.map(user => user.toClient({ shouldOmitTrips }))
  },
  createUser: async req => {
    // Forbid non admin users to edit the user's trips
    if (req.body.trips && req.user.role !== roles.ADMIN) {
      throw new ErrorHandler(401, {
        message: 'Not authorized to access this resource',
      })
    }

    const user = new User(req.body)
    await user.save()

    return user.toClient()
  },
  updateUser: async req => {
    // Do not allow password changes
    delete req.body.password

    // Forbid non admin users to edit the user's trips
    if (req.body.trips && req.user.role !== roles.ADMIN) {
      throw new ErrorHandler(401, {
        message: 'Not authorized to access this resource',
      })
    }

    // Find the user and pass it the update object
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })

    const shouldOmitTrips = req.user.role === roles.MANAGER

    return user.toClient({ shouldOmitTrips })
  },
  deleteUser: async req => {
    // Find the user and pass it the update object
    await User.deleteOne({ _id: req.params.id })
  },
}

export default userService

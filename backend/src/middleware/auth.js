import jwt from 'jsonwebtoken'
import ErrorHandler from '../helpers/error'
import User from '../models/User'

const handleAuth = (requiredRoles = []) => async (req, _res, next) => {
  const { token } = req.cookies

  try {
    // Verify the user token
    req.user = jwt.verify(token, process.env.JWT_SECRET)

    // Set the real user role in case the token is outdated
    if (requiredRoles.length) {
      const user = await User.findOne({ _id: req.user.id })
      req.user.role = user.role
    }
    // Check if the user role satisfies the required roles
    if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
      throw new Error()
    }

    next()
  } catch (err) {
    next(
      new ErrorHandler(401, {
        message: 'Not authorized to access this resource',
      }),
    )
  }
}

export default handleAuth

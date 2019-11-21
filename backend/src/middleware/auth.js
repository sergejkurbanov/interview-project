import jwt from 'jsonwebtoken'
import User from '../models/User'
import ErrorHandler from '../helpers/error'

const handleAuth = async (req, _res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  const data = jwt.verify(token, process.env.JWT_KEY)

  try {
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    if (!user) {
      throw new ErrorHandler(401, 'Not authorized to access this resource')
    }

    req.user = user
    req.token = token

    next()
  } catch (error) {
    next(error)
  }
}

export default handleAuth

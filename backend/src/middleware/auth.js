import jwt from 'jsonwebtoken'
import ErrorHandler from '../helpers/error'

const handleAuth = async (req, _res, next) => {
  const { token } = req.cookies

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    next(new ErrorHandler(401, 'Not authorized to access this resource'))
  }
}

export default handleAuth

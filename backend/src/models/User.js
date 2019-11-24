import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'
import ErrorHandler from '../helpers/error'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true,
  },
  email: {
    type: String,
    required: 'Email is required',
    unique: 'Email already exists',
    lowercase: true,
    validate: {
      validator: value => validator.isEmail(value),
      msg: 'Enter a valid email address.',
    },
  },
  password: {
    type: String,
    required: 'Password is required',
    minLength: 6,
  },
  date: {
    type: Date,
    defaults: Date.now,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', async function(next) {
  // Hash the password before saving the user
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.methods.generateAuthTokens = async function() {
  // Generate auth tokens for the user
  const user = this
  const id = user._id
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 5, // 15 minutes expiration date
    // expiresIn: 15 * 60, // 15 minutes expiration date
  })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 10, // 7 days expiration date
    // expiresIn: 7 * 24 * 60 * 60, // 7 days expiration date
  })
  user.tokens = user.tokens.concat({ token: refreshToken })

  await user.save()
  return [token, refreshToken]
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid login credentials')

  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) throw new Error('Invalid login credentials')

  return user
}

userSchema.statics.findByTokenAndClearIt = async refreshToken => {
  try {
    const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findOne({
      _id: data.id,
      'tokens.token': refreshToken,
    })

    if (!user) throw new Error()

    // Remove the old refresh token and save the user
    user.tokens = user.tokens.filter(token => token.token !== refreshToken)
    await user.save()

    return user
  } catch (err) {
    throw new ErrorHandler(401, 'Not authorized to access this resource')
  }
}

const User = mongoose.model('User', userSchema)

export default User

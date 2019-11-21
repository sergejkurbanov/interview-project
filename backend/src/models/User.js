import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'

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

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid login credentials')

  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) throw new Error('Invalid login credentials')

  return user
}

const User = mongoose.model('User', userSchema)

export default User

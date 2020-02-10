import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()

if (!envFound) throw new Error("Couldn't find .env file")

export default {
  port: parseInt(process.env.PORT || 1337, 10),
  databaseURL: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  origin: process.env.ORIGIN || 'http://localhost:3000',
}

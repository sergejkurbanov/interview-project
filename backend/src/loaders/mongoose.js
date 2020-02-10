import mongoose from 'mongoose'
import config from '../config'

// Connect to the db and handle success/error
const mongooseLoader = async () => {
  try {
    await mongoose.connect(config.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default mongooseLoader

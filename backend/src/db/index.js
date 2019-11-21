import mongoose from 'mongoose'

// Connect to the db and handle success/error
const connectDb = async callback => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })

    callback()
  } catch (err) {
    console.err(err)
    process.exit(1)
  }
}

export default connectDb

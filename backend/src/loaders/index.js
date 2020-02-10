import expressLoader from './express'
import mongooseLoader from './mongoose'

export default {
  init: async ({ app }) => {
    await mongooseLoader()
    console.log('MongoDB initialized')

    await expressLoader({ app })
    console.log('Express initialized')
  },
}

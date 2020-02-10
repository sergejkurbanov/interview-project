import express from 'express'
import loaders from './loaders'
import config from './config'

const startServer = async () => {
  const app = express()

  await loaders.init({ app })

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

startServer()

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  const { statusCode, message } = err

  console.err(err)

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  })
}

export default handleError

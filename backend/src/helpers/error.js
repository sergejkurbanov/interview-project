class ErrorHandler extends Error {
  constructor(statusCode = 500, error) {
    super()
    this.statusCode = statusCode

    const { errors, message } = error

    if (errors) {
      // Parse validation errors
      this.message = Object.values(errors)
        .map(validationError => validationError.message)
        .join(', ')
    } else {
      // Set the message normally
      this.message = message || 'Sorry, something went wrong. Try again later.'
    }
  }
}

export default ErrorHandler

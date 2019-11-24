class ErrorHandler extends Error {
  constructor(statusCode = 500, error = 'Sorry, something went wrong.') {
    super()
    this.statusCode = statusCode

    if (typeof error === 'string') {
      // Set the message normally
      this.message = error
    } else {
      // Parse validation errors
      this.message = Object.values(error)
        .map(validationError => validationError.message)
        .join(', ')
    }
  }
}

export default ErrorHandler

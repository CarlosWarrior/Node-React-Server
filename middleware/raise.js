class AppError extends Error {
  constructor({status, message, errors = null}) {
    super(message)
    this.statusCode = status
    this.errors = errors
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = c => {throw new AppError(c)};

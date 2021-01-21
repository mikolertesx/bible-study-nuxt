class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.details = message
  }
}

export default ValidationError

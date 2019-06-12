// Pick a convention and stick with it
// Don't overcomplicate things, for instance, JS provides an existing Error object
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.type = "ValidationError"
  }
}

class RequestError {
  constructor(Error, code, detail) {
    this.message = Error.message
    this.type = Error.type

    this.code = code
    this.detail = detail
  }

  serializeToJson() {
    JSON.stringify(this)
  }
}
const HttpError = require("./HttpError");


class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

module.exports = BadRequestError;
const HttpError = require("./HttpError");

class NotFoundError extends HttpError {
  constructor(message = "Resource is not found") {
    super(404, message);
  }
}

module.exports = NotFoundError;
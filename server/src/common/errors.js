/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "BadRequest";
  }

  getCode() {
    return 400;
  }
}

class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "NotFound";
  }

  getCode() {
    return 404;
  }
}

class MongoError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "MongoError";
  }

  getCode() {
    return 400;
  }
}

module.exports = { GeneralError, BadRequest, NotFound, MongoError };

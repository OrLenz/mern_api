const { StatusCodes } = require("http-status-codes");

const CustomError = require("./custom-error");

class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequest;

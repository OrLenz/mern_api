const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  //set Default
  let customError = {
    StatusCodes: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:
      err.message || "Terjadi kesalahan sistem, mohon coba beberapa saat lagi",
  };
  // Error validation mongoose
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.StatusCodes = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Data yang masuk untuk field ${Object.keys(
      err.keyValue
    )} duplikat`;
    customError.StatusCodes = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `Data dengan id : ${err.value} tidak ditemukan`;
    customError.StatusCodes = 404;
  }

  return res.status(customError.StatusCodes).json({
    status: customError.StatusCodes,
    message: customError.msg,
    data: null,
  });
};

module.exports = errorHandlerMiddleware;

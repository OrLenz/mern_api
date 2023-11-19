const { StatusCodes } = require("http-status-codes");

const { createImages } = require("../../../services/mongoose/image");

const create = async (req, res, next) => {
  try {
    console.log("req.file");
    console.log(req.file);
    const result = await createImages(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: "data berhasil ditambahkan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { create };

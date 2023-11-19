const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "data ditemukan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "id categories ditemukan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: "data berhasil ditambahkan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "data berhasil diubah",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "data berhasil dihapus",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  findOne,
  create,
  update,
  destroy,
};

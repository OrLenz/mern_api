const {
  queryAllTalents,
  getAllTalentsByBody,
  getOneTalents,
  updateTalents,
  createTalents,
  deleteTalents,
} = require("../../../services/mongoose/talents");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: "data berhasil ditambahkan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await queryAllTalents(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "data ditemukan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findByBody = async (req, res, next) => {
  try {
    const result = await getAllTalentsByBody(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "data ditemukan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneTalents(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "id categories ditemukan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req);

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
    const result = await deleteTalents(req);

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
  findByBody,
  find,
  create,
  update,
  destroy,
};

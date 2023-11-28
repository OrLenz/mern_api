const {
  queryAllEvents,
  findAllEventsByBody,
  getOneEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../../../services/mongoose/events");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);

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
    const result = await queryAllEvents(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "data ditemukan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const indexByBody = async (req, res, next) => {
  try {
    const result = await findAllEventsByBody(req);

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
    const result = await getOneEvents(req);

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
    const result = await updateEvents(req);

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
    const result = await deleteEvents(req);

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
  indexByBody,
  find,
  update,
  destroy,
  create,
};

const Categories = require("./model");
const {
  getAllCategories,
  createCategories,
} = require("../../../services/mongoose/categories");

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    res.status(200).json({
      status: 200,
      message: "data ditemukan",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findOne({ _id: id }).select("_id name");

    if (!result) {
      res.status(404).json({
        status: 404,
        message: "id categories tidak ditemukan",
        data: result,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "id categories ditemukan",
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await createCategories(req);

    if (!result) {
      res.status(500).json({
        status: 500,
        message: "terjadi kesalahan sistem",
        data: result,
      });
    } else {
      res.status(201).json({
        status: 201,
        message: "data berhasil ditambahkan",
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Opsi ORM
    const { name } = req.body;

    const result = await Categories.findOneAndUpdate(
      {
        _id: id,
      },
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    // const result = await Categories.findById(id).select("_id name");

    if (!result)
      return res.status(404).json({
        status: 404,
        message: "id categories tidak ditemukan",
        data: null,
      });

    // result.name = req.body.name;
    // await result.save();
    res.status(201).json({
      status: 201,
      message: "data berhasil diubah",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Categories.findByIdAndDelete(id);

    // const result = await Categories.findById(id).select("_id name");

    if (!result)
      return res.status(404).json({
        status: 404,
        message: "id categories tidak ditemukan",
        data: null,
      });

    // await result.deleteOne();

    res.status(200).json({
      status: 200,
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

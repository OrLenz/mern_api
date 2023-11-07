const Categories = require("../../api/v1/categories/model");

const { BadRequestError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find();
  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  // Validasi data tidak duplikat
  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError("data sudah ada di db");

  const result = await Categories.create({ name });

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
};

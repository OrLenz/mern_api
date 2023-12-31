const Categories = require("../../api/v1/categories/model");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find();
  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  //validasi data tidak string
  if (name !== name.toString())
    throw new BadRequestError("data name harus string");

  // Validasi data tidak duplikat
  const check = await Categories.findOne({ name });
  if (check) throw new BadRequestError("data sudah ada di db");

  const result = await Categories.create({ name });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`id : ${id} tidak ditemukan`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  //Validasi id tidak ditemukan
  const checkId = await Categories.findOne({
    name,
    _id: id,
  });
  if (!checkId) throw new NotFoundError(`id : ${id} tidak ditemukan`);

  //Validasi data sudah ada di id lain
  const checkName = await Categories.findOne({
    name,
    _id: { $ne: id },
  });
  if (checkName) throw new BadRequestError("data sudah ada di db");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findByIdAndDelete(id);

  // const result = await Categories.findById(id).select("_id name");

  if (!result) throw new NotFoundError(`id : ${id} tidak ditemukan`);

  // await result.deleteOne();

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};

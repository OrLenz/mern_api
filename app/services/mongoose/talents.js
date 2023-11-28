const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");

const { NotFoundError, BadRequestError } = require("../../errors");

const queryAllTalents = async (req) => {
  const { name, role } = req.query;

  let condition = {};

  if (name) {
    condition = { ...condition, name: { $regex: name, $options: "i" } };
  }

  if (role) {
    condition = { ...condition, role: { $regex: role, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id urlImage",
    })
    .select("_id name role image");

  return result;
};

const getAllTalentsByBody = async (req) => {
  const { name, role } = req.query;

  let condition = {};

  if (name) {
    condition = { ...condition, name: { $regex: name, $options: "i" } };
  }

  if (role) {
    condition = { ...condition, role: { $regex: role, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id urlImage",
    })
    .select("_id name role image");

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  if (name === "")
    throw new BadRequestError("request name tidak boleh string kosong");
  if (image === "")
    throw new BadRequestError("request image tidak boleh string kosong");
  if (role === "")
    throw new BadRequestError("request role tidak boleh string kosong");

  await checkingImage(image);

  const check = await Talents.findOne({ name });

  if (check) throw new BadRequestError("data sudah ada di db");

  const result = await Talents.create({ name, image, role });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id urlImage",
    })
    .select("_id name role image");

  if (!result) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  if (!name || name === "")
    throw new BadRequestError("request name tidak ditemukan");
  if (!image || image === "")
    throw new BadRequestError("request image tidak ditemukan");
  if (!role || role === "")
    throw new BadRequestError("request role tidak ditemukan");

  await checkingImage(image);

  const checkId = await Talents.findOne({
    name,
    _id: id,
  });

  if (!checkId) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  const checkName = await Talents.findOne({
    name,
    _id: { $ne: id },
  });

  if (checkName) throw new BadRequestError("data sudah ada di db");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  await result.deleteOne();

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  return result;
};

module.exports = {
  queryAllTalents,
  getAllTalentsByBody,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};

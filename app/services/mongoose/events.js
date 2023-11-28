const Events = require("../../api/v1/events/model");
const { checkingCategories } = require("./categories");
const { checkingImage } = require("./images");
const { checkingTalents } = require("./talents");

const { NotFoundError, BadRequestError } = require("../../errors");

const queryAllEvents = async (req) => {
  const { title, category, talent } = req.query;
  let condition = {};

  if (title) {
    condition = { ...condition, title: { $regex: title, $options: "1" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  const result = await Events.find(condition)
    .populate({
      path: "image",
      select: "_id urlImage",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id urlImage" },
    });

  return result;
};

const findAllEventsByBody = async (req) => {
  const { title, category, talent } = req.body;
  let condition = {};

  if (title) {
    condition = { ...condition, title: { $regex: title, $options: "1" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  const result = await Events.find(condition)
    .populate({
      path: "image",
      select: "_id urlImage",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id urlImage" },
    });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keypoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingTalents(talent);
  await checkingCategories(category);

  const check = await Events.findOne({ title });

  if (check) throw new BadRequestError("data sudah ada di db");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keypoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id })
    .populate({ path: "image", select: "_id urlImage" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id urlImage" },
    });

  if (!result) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keypoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingTalents(talent);
  await checkingCategories(category);

  const checkId = await Events.findOne({
    title,
    _id: id,
  });

  if (!checkId) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  const checkTitle = await Events.findOne({
    title,
    _id: { $ne: id },
  });

  if (checkTitle) throw new BadRequestError("data sudah ada di db");

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keypoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id });

  if (!result) throw new NotFoundError(`id: ${id} tidak ditemukan`);

  await result.deleteOne();

  return result;
};

module.exports = {
  queryAllEvents,
  findAllEventsByBody,
  getOneEvents,
  createEvents,
  updateEvents,
  deleteEvents,
};

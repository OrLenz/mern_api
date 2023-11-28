const mongoose = require("mongoose");

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "tipe tiket harus diisi"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "judul harus diisi"],
      minLength: 3,
      maxLength: 20,
    },
    date: {
      type: Date,
      required: [true, "tanggal harus diisi"],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, "tagline harus diisi"],
    },
    keypoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, "tempat acara harus diisi"],
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: [true, "tiket harus diisi"],
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: [true, "gambar harus ditambahkan"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "kategori harus diisi"],
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
      required: [true, "talent harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);

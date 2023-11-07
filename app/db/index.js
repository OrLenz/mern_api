// Import package mongoose
const mongoose = require("mongoose");

// Import config terkait MongoDB dari app/config/index.js
const { urlDb } = require("../config");

// Connect ke MongoDB menggunakan config yang telah diimport
mongoose.connect(urlDb);

// simpan koneksi kedalam constant db
const db = mongoose.connection;

// Export db supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;

const notFound = (req, res) => {
  res.status(404).send({ message: "Router tidak ditemukan" });
};

module.exports = notFound;

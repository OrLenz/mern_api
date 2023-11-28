const express = require("express");
const router = express();
const {
  index,
  indexByBody,
  find,
  update,
  destroy,
  create,
} = require("./controller");

router.get("/events", index);
router.get("/events", indexByBody);
router.get("/events/:id", find);
router.put("/events/update/:id", update);
router.delete("/events/delete/:id", destroy);
router.post("/events/create", create);

module.exports = router;

const express = require("express");
const router = express();
const { index, find, create, update, destroy } = require("./controller");

router.get("/talents", index);
router.get("/talents/:id", find);
router.post("/talents/create", create);
router.put("/talents/update/:id", update);
router.delete("/talents/delete/:id", destroy);

module.exports = router;

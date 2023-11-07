const express = require("express");
const router = express();
const { index, create, findOne, update, destroy } = require("./controller");

router.get("/categories", index);

router.get("/categories/:id", findOne);

router.post("/categories/create", create);

router.put("/categories/update/:id", update);

router.delete("/categories/delete/:id", destroy);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

router.get("/", userController.create);
router.get("/usuarios", userController.index);
router.post("/usuarios", userController.storeInS3);

module.exports = router;

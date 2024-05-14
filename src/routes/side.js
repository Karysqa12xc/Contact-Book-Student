const express = require("express");
const router = express.Router();

const sideController = require("../app/controllers/SideController");
router.get("/request", sideController.request);
router.get("/about", sideController.about);
router.get("/", sideController.index);
module.exports = router;
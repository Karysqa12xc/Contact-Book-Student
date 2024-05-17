const express = require("express");
const router = express.Router();

const sideController = require("../app/controllers/SideController");
router.get("/request", sideController.request);
router.get("/request/:id/Content", sideController.requestContent);
router.post("/request", sideController.createRequest);
router.get("/forget", sideController.forgetPass);
router.get("/about", sideController.about);
router.get("/", sideController.index);
module.exports = router;
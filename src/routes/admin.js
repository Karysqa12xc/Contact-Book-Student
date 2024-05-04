const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
router.get("/create-account", adminController.create_account_view);
router.post("/create-account", adminController.create_account_post);
module.exports = router;
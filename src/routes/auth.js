const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");
router.get("/logout", authController.logout);
router.get("/", authController.login);
router.post("/", authController.postLogin);
module.exports = router;
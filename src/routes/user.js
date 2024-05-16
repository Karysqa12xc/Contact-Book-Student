const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");

router.get("/edit", userController.renderEditForm);
router.post("/edit", userController.updateUserInfor);
module.exports = router;
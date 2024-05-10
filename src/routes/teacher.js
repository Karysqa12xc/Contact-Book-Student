const express = require("express");
const router = express.Router();
const enterScoreController = require("../app/controllers/TeacherController");
router.get("/NhapDiem", enterScoreController.enterScore);
module.exports = router;
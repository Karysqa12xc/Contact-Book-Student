const express = require("express");
const router = express.Router();
const teacherController = require("../app/controllers/TeacherController");
router.get("/NhapDiem", teacherController.enterScore);
module.exports = router;
const express = require("express");
const router = express.Router();
const teacherController = require("../app/controllers/TeacherController");
router.get("/NhapDiem", teacherController.enterScore);
router.get("/DiemDanh",teacherController.attendance);
module.exports = router;
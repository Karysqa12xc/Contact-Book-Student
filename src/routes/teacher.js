const express = require("express");
const router = express.Router();
const teacherController = require("../app/controllers/TeacherController");

router.get("/NhapDiem", teacherController.enterScore);
// router.get("/DiemDanh",teacherController.attendance);
router.get('/teacher', teacherController.getStudents);
router.post('/attendance', teacherController.postAttendance);

router.get("/schedule", teacherController.scheduleClass)
module.exports = router;
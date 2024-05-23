const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/StudentController");


router.get('/fee-info', studentController.viewFee);
router.get('/timetable', studentController.viewTimeTableStudent);
router.get("/view-score", studentController.viewScore);
// router.get('/fee-info/:MaTaiKhoan', studentController.viewFeeByMaTaiKhoan);

module.exports = router;
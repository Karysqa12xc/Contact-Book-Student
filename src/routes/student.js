const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/StudentController");

router.get('/fee-info', studentController.viewFee);
router.get('/fee-info/:MaTaiKhoan', studentController.viewFeeByMaTaiKhoan);
router.get('/students/edit/', studentController.renderEditForm);
router.post('/students/eidt/:id', studentController.updateStudentInfo);
module.exports = router;
const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/StudentController");

router.get('/fee-info', studentController.viewFee);
router.get('/fee-info/:MaTaiKhoan', studentController.viewFeeByMaTaiKhoan);
router.get('/students/edit/:id', studentController.renderEditForm);
router.post('/students/update/:id', studentController.updateStudentInfo);
module.exports = router;
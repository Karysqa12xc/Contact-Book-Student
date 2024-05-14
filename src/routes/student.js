const express = require("express");
const router = express.Router();

const studentController = require("../app/controllers/StudentController");

router.get("/HocPhi", studentController.viewFee);
router.get("/SuaThongTin", studentController.editInfo);
module.exports = router;
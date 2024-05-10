const express = require("express");
const router = express.Router();

const viewFeeController = require("../app/controllers/StudentController");
const fixInforController = require("../app/controllers/StudentController")
router.get("/HocPhi", viewFeeController.viewFee);
router.get("/SuaThongTin", fixInforController.fixInfor)
module.exports = router;
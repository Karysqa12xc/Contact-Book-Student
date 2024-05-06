const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");

router.get("/class-management", adminController.class_management_view);
router.post("/class-management", adminController.class_management_post);
router.put("/:id/add-student-into-class", adminController.add_student_into_class);
router.get("/create-account", adminController.create_account_view);
router.post("/create-account", adminController.create_account_post);
module.exports = router;
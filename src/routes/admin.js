const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
router.put("/:id/add-student-into-class", adminController.add_student_into_class);
router.put("/:id/class-details", adminController.delete_account_in_class);
router.post("/:id/class-details", adminController.class_details);
router.get("/class-management", adminController.class_management_view);
router.post("/class-management", adminController.class_management_post);
router.get("/account-management", adminController.account_management_view);
router.post("/account-management", adminController.account_management_post);
module.exports = router;
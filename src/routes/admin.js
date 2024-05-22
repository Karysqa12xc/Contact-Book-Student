const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
router.put("/:id/add-student-into-class", adminController.add_student_into_class);
router.put("/:id/class-details", adminController.delete_account_in_class);
router.put("/:id/lock-account", adminController.lock_account);
router.post("/course-create", adminController.course_create);
router.put("/course-update-teacher", adminController.course_update_teacher);
router.delete("/delete-course", adminController.delete_course);
router.get("/management-timetable", adminController.viewTKB)
router.post("/create-time-table", adminController.courseTimeTable);
router.post("/create-semester", adminController.createSemester);
router.get("/course", adminController.course_view);
router.get("/export-cost", adminController.exportCourseCost)
router.post("/export-cost", adminController.exportNewCostCourse);
router.post("/:id/class-details", adminController.class_details);
router.get("/class-management", adminController.class_management_view);
router.post("/class-management", adminController.class_management_post);
router.get("/account-management", adminController.account_management_view);
router.post("/account-management", adminController.account_management_post);

module.exports = router;
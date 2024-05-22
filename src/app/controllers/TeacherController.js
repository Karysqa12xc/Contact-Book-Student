
const attendanceModel = require("../models/Attendance")
const Semester = require("../models/Semester");
const CourseDetails = require("../models/CourseDetails");
const Account = require("../models/Account");
class TeacherController {
  //[GET] /teacher/NhapDiem
  async enterScore(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        const classOfTeacher = await CourseDetails.GetDataToAddScore(req.session.account.MaTaiKhoan);
        let accountInfo;
        if(req.query.idClass != null){
          accountInfo = await Account.getByIdClass(req.query.idClass);
        }
        res.render("../../resources/user/teacher/enterscore.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
          accountInfo: accountInfo,
          classOfTeacher: classOfTeacher,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  async  getStudents(req, res) {
    try {
<<<<<<< HEAD
      if (!req.session.isLoggedIn) {
        // console.log("adadfd");
        return res.redirect("/");
      } else {
        res.render("../../resources/user/teacher/attendance.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn});
      }
=======
        if (!req.session.isLoggedIn) {
            return res.redirect("/");
        }

        const classes = await attendanceModel.getClasses();
        const selectedClassId = req.query.class || null;
        let students = [];

        if (selectedClassId) {
            students = await attendanceModel.getStudentsByClass(selectedClassId);
        }

        res.render("../../resources/user/teacher/attendance.hbs", {
            account: req.session.account,
            logged: req.session.isLoggedIn,
            classes,
            students,
            selectedClassId
        });
>>>>>>> main
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
}

async postAttendance(req, res) {
    try {
        if (!req.session.isLoggedIn) {
            return res.redirect("/");
        }

        const classId = req.body.classId;
        const attendance = Object.keys(req.body.attendance || {}).map(studentId => ({
            MaHocSinh: parseInt(studentId, 10),
            TrangThai: 1
        }));

        await attendanceModel.saveAttendance(classId, attendance);
        res.redirect(`/students?class=${classId}`);
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
}
}
module.exports = new TeacherController();


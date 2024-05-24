const Attendance = require("../models/Attendance");
const Semester = require("../models/Semester");
const CourseDetails = require("../models/CourseDetails");
const Account = require("../models/Account");
class TeacherController {
  //[]
  async enterScore(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        const classOfTeacher = await CourseDetails.GetDataToAddScore(
          req.session.account.MaTaiKhoan
        );
        let accountInfo;
        if (req.query.idClass != null) {
          accountInfo =
            await CourseDetails.GetValueJoinOtherTableWithIdClassOfStudent(
              req.query.idClass
            );
        }
        res.render("../../resources/user/teacher/enterscore.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
          classOfTeacher: classOfTeacher,
          accountInfo: accountInfo,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[]
  async getStudents(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
<<<<<<< HEAD

      const classes = await attendanceModel.getClasses(req.session.account.MaLop);
      const selectedClassId = req.query.class || null;
      let students = [];
      if (selectedClassId) {
        students = await Account.getStudentsByClass(selectedClassId);
      }
=======
        const classOfTeacher = await CourseDetails.GetDataToAddScore(
          req.session.account.MaTaiKhoan
        );
        const semesterInfo = await Semester.getAll();
        let accountInfo;
        let CourseDetailsTime;
        if (req.query.idClass != null && req.query.idSemester) {
          accountInfo = await CourseDetails.GetDataToAddAttendance(
            req.query.idClass,
            req.query.idSemester
          );
          CourseDetailsTime = await CourseDetails.GetOnlyThoiGianInCourseDetails(req.query.idSemester);
        }
>>>>>>> da4ae27dd044ca01cf84dcf3c7427fb652153516
        res.render("../../resources/user/teacher/attendance.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
          classOfTeacher: classOfTeacher,
          accountInfo: accountInfo,
          CourseDetailsTime: CourseDetailsTime,
          semesterInfo: semesterInfo,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error: ${error}`});
    }
  }
  //[POST] /teacher/attendance
  async postAttendance(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        const {IdSemester, IdClass, IdAccount, IdCourse, ThoiGian, attendance} = req.body;
        const data = {
          IdSemester: Array.isArray(IdSemester) ? IdSemester : [IdSemester],
          IdClass: Array.isArray(IdClass) ? IdClass : [IdClass],
          IdCourse: Array.isArray(IdCourse) ? IdCourse : [IdCourse],
          IdAccount: Array.isArray(IdAccount) ? IdAccount : [IdAccount],
          ThoiGian: Array.isArray(ThoiGian) ? ThoiGian : [ThoiGian],
          attendance: attendance || {},
        };
        for(let i = 0; i < data.IdAccount.length; i++){
          let idSemester = data.IdSemester[i];
          let idClass = data.IdClass[i];
          let idCourse = data.IdCourse[i];
          let idAccount = data.IdAccount[i];
          let Time = data.ThoiGian[i];
          let DiemDanh = data.attendance[idAccount] === "true" ? 1 : 0 ;
          await Attendance.saveAttendance(idSemester, idClass, 
            idCourse, 
            idAccount, 
            Time, 
            DiemDanh);
        }
        res.redirect("back");
      }
<<<<<<< HEAD
  
      const classId = req.body.classId;
      const attendanceData = req.body.attendance || {};
      
      // Transform attendance data into the required format for saving
      const attendance = Object.keys(attendanceData).map(studentId => ({
        MaHocSinh: parseInt(studentId, 10),
        TrangThai: attendanceData[studentId] === '1' ? 1 : 0, 
      }));
  
      await attendanceModel.saveAttendance(classId, attendance);
      res.redirect(`/students?class=${classId}`);
=======
>>>>>>> da4ae27dd044ca01cf84dcf3c7427fb652153516
    } catch (error) {
      res.status(500).json({ message: `Internal server error: ${error}` });
    }
  }
<<<<<<< HEAD
  // async postAttendance(req, res){
  //   try {
  //     const {classId,attendanceDate, attendance} = req.body;
  //     await attendanceModel.saveAttendance(classId,attendanceDate, attendance);
  //     res.redirect("back");
  //   } catch (error) {
  //     res.status(500).json({message: `Internal server error + ${error}`});
  //   }
  // }
  async scheduleClass(req, res){
=======
  //[]
  async scheduleClass(req, res) {
>>>>>>> da4ae27dd044ca01cf84dcf3c7427fb652153516
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        const account = req.session.account;
        console.log(account.MaTaiKhoan);
        const SemesterInfo = await Semester.getAll();
        const TimeTableInfo =
          await CourseDetails.GetValueJoinOtherTableWithIdAccount(
            account.MaTaiKhoan
          );
        const days = [
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
          "Chủ Nhật",
        ];
        res.render("../../resources/user/teacher/schedule.hbs", {
          SemesterInfo: SemesterInfo,
          days: days,
          TimeTableInfo: TimeTableInfo,
          account: account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[]
  async updateScore(req, res) {
    try {
      const {IdClass, IdCourse, IdSemester, Score} = req.body;
      await CourseDetails.UpdateScore(IdClass, IdCourse, IdSemester, Score);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
}
module.exports = new TeacherController();

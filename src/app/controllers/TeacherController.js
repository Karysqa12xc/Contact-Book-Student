const Attendance = require("../models/Attendance");
const Semester = require("../models/Semester");
const CourseDetails = require("../models/CourseDetails");
const Account = require("../models/Account");
const ScoreCourse = require("../models/ScoreCourse");
class TeacherController {
  //[GET] /teacher/NhapDiem
  async enterScore(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        //Lấy dữ liệu để nhập điểm
        const classOfTeacher = await CourseDetails.GetDataToAddScore(
          req.session.account.MaTaiKhoan
        );

        let accountInfo;
        //Dữ liệu gửi từ form có method get có khác null
        if (req.query.idClass != null) {
          //Lấy dữ liệu các học sinh ở trong lớp do giáo
          // viên phụ trách có điểm số chưa được nhập
          let MaLopAndMaMonHoc = req.query.idClass;
          let splitMaLopAndMaMonHoc = MaLopAndMaMonHoc.split(" - ");
          let MaLop = splitMaLopAndMaMonHoc[0];
          let MaMonHoc = splitMaLopAndMaMonHoc[splitMaLopAndMaMonHoc.length - 1];
          console.log(MaLop);
          console.log(MaMonHoc);
          accountInfo =
            await CourseDetails.GetValueJoinOtherTableWithIdClassOfStudent(
              MaLop,
              MaMonHoc
            );
        }
        //Chuyển đến trang nhập điểm và truyền dữ liệu lên
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
  //[GET] /teacher/teacher
  async getStudents(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        //Lấy các học sinh ở trong lớp của giáo viên
        const classOfTeacher = await CourseDetails.GetDataClassOfTeacher(
          req.session.account.MaTaiKhoan
        );
        let checkDisplay = false;
        //Lấy tất cả học kì
        const semesterInfo = await Semester.getAll();
        //
        let accountInfo;
        let CourseDetailsTime;
        if (req.query.idClass != null && req.query.idSemester != null) {
          //Lấy thời gian của ngày điểm danh
          CourseDetailsTime =
            await CourseDetails.GetOnlyThoiGianVaMonHocInCourseDetails(
              req.query.idSemester
            );
          let ThoiGianVaTenMon = req.query.ThoiGianVaTenMon;
          // Lấy dữ liệu để điểm danh
          if (ThoiGianVaTenMon != null) {
            checkDisplay = true;
            let splitThoiGianVaTenMon = ThoiGianVaTenMon.split(" - ");
            let ThoiGian = splitThoiGianVaTenMon.slice(0, 4).join(" - ");
            let MonHoc =
              splitThoiGianVaTenMon[splitThoiGianVaTenMon.length - 1];
            accountInfo = await CourseDetails.GetDataToAddAttendance(
              req.query.idClass,
              req.query.idSemester,
              ThoiGian,
              MonHoc
            );
          }
        }

        res.render("../../resources/user/teacher/attendance.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
          classOfTeacher: classOfTeacher,
          accountInfo: accountInfo,
          CourseDetailsTime: CourseDetailsTime,
          semesterInfo: semesterInfo,
          checkDisplay: checkDisplay
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
        const {IdSemester, IdClass, IdAccount, IdCourse, ThoiGian, attendance} =
          req.body;
        //Lấy dữ liệu từ mảng gửi lên từ form
        const data = {
          IdSemester: Array.isArray(IdSemester) ? IdSemester : [IdSemester],
          IdClass: Array.isArray(IdClass) ? IdClass : [IdClass],
          IdCourse: Array.isArray(IdCourse) ? IdCourse : [IdCourse],
          IdAccount: Array.isArray(IdAccount) ? IdAccount : [IdAccount],
          ThoiGian: Array.isArray(ThoiGian) ? ThoiGian : [ThoiGian],
          attendance: attendance || {},
        };
        for (let i = 0; i < data.IdAccount.length; i++) {
          //Gán các dữ liệu từ mảng
          let idSemester = data.IdSemester[i];
          let idClass = data.IdClass[i];
          let idCourse = data.IdCourse[i];
          let idAccount = data.IdAccount[i];
          let Time = data.ThoiGian[i];
          let DiemDanh = data.attendance[idAccount] === "true" ? 1 : 0;
          
          //Thêm dữ liệu vào bảng điểm danh
          await Attendance.saveAttendance(
            idSemester, idClass,
            idCourse,
            idAccount,
            Time,
            DiemDanh);
        }
        res.redirect("back");
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error: ${error}`});
    }
  }
  //[GET] /teacher/schedule
  async scheduleClass(req, res) {
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
  //[POST] /teacher/enter-score
  async addScore(req, res) {
    try {
      //Tạo ra object chưa các dữ liệu gửi form lên
      const {IdClass, IdCourse, IdSemester, IdAccount, Score} = req.body;
      //Chạy cậu lệnh update dữ liệu vào db
      await ScoreCourse.addScore(IdClass, IdCourse, IdSemester, IdAccount, Score);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
}
module.exports = new TeacherController();

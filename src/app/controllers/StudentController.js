const ViewFee = require("../models/ViewFee");
const Semester = require("../models/Semester");
const CourseDetails = require("../models/CourseDetails");
const Account = require("../models/Account");
const ScoreCourse = require("../models/ScoreCourse");
class StudentController {
  //[GET] /student/fee-info
  async viewFee(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const account = req.session.account;
        //Lấy các học phí với mà tài khoản đang đăng nhập
        const result = await ViewFee.getByMaTaiKhoan(
          req.session.account.MaTaiKhoan
        );
        //Lấy tất cả học kì trong cơ sở dữ liệu
        const semester = await Semester.getAll();
        
        res.render("../../resources/user/student/money.hbs", {
          account: account,
          FeeInfor: result,
          semester: semester,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({message: `Internal server error: ${error.message}`});
    }
  }
  //[GET] /student/timetable
  async viewTimeTableStudent(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const account = req.session.account;
        const SemesterInfo = await Semester.getAll();
        const TimeTableInfo =
          await CourseDetails.GetValueJoinOtherTableWithIdClassOfTeacher(account.MaLop);
        const days = [
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
          "Chủ Nhật",
        ];
        res.render("../../resources/user/student/tkb.hbs", {
          SemesterInfo: SemesterInfo,
          days: days,
          TimeTableInfo: TimeTableInfo,
          account: account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({message: `Internal server error: ${error.message}`});
    }
  }
  //[GET] /student/view-score
  async viewScore(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const semesterInfo = await Semester.getAll();
        const ScoreOfStudent = await ScoreCourse.GetDataForViewScore(req.session.account.MaLop, req.session.account.MaTaiKhoan);
        res.render("../../resources/user/student/score.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
          semesterInfo: semesterInfo,
          ScoreOfStudent: ScoreOfStudent,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({message: `Internal server error: ${error.message}`});
    }
  }
}

module.exports = new StudentController();

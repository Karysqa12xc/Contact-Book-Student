const Semester = require("../models/Semester");
const CourseDetails = require("../models/CourseDetails");
class TeacherController {
  async enterScore(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        res.render("../../resources/user/teacher/enterscore.hbs");
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  async attendance(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        res.render("../../resources/user/teacher/attendance.hbs", {account: req.session.account,
        logged: req.session.isLoggedIn});
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  } 
  async scheduleClass(req, res){
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("/");
      } else {
        const account = req.session.account;
        console.log(account.MaTaiKhoan);
        const SemesterInfo = await Semester.getAll();
        const TimeTableInfo = await CourseDetails.GetValueJoinOtherTableWithIdAccount(account.MaTaiKhoan);
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
          logged: req.session.isLoggedIn}
        );
      }
    } catch (error) {
      
    }
  }
}
module.exports = new TeacherController();

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
        // console.log("adadfd");
        return res.redirect("/");
      } else {
        res.render("../../resources/user/teacher/attendance.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn});
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  } 
}
module.exports = new TeacherController();

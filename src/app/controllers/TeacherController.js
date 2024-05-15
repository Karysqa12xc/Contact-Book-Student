class TeacherController {
  async enterScore(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        res.render("../../resources/user/teacher/enterscore.hbs");
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  async editInfo(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        res.render("../../resources/user/student/suathongtin.hbs");
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
}
module.exports = new TeacherController();

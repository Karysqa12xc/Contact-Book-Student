const ViewFee = require("../models/ViewFee");
class StudentController {
  async viewFee(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        const result = await ViewFee.getAll();
        res.render("../../resources/user/student/money.hbs", {
          FeeInfor: result,
        });
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
        const result = await ViewFee.getAll();
        res.render("../../resources/user/student/suathongtin.hbs");
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  
}
module.exports = new StudentController();

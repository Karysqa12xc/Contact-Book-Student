const ViewFee = require("../models/ViewFee");

class StudentController {
  async viewFee(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const account = req.session.account;
        const result = await ViewFee.getByMaTaiKhoan(req.session.account.MaTaiKhoan);
        //res.json(result);
        res.render("../../resources/user/student/money.hbs", { account: account, FeeInfor: result,logged: req.session.isLoggedIn, });
      }
    } catch (error) {
      console.error("Error in viewFee:", error);
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }
  // async viewFeeByMaTaiKhoan(req, res) {
  //   try {
  //     const MaTaiKhoan = req.params.MaTaiKhoan;
  //     const result = await ViewFee.getByMaTaiKhoan(MaTaiKhoan);
  //     if (!result || !Array.isArray(result)) {
  //       throw new Error("Invalid data received from database");
  //     }
  //     res.render("../../resources/user/student/money.hbs", { FeeInfor: result
  //     });
  //   } catch (error) {
  //     console.error("Error in viewFeeByMaTaiKhoan:", error);
  //     res.status(500).json({ message: `Internal server error: ${error.message}` });
  //   }
  // }
}

module.exports = new StudentController();

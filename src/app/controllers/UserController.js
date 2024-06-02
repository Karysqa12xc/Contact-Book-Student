const account = require("../models/Account");
class userController {
  //[GET] /user
  async UserInfo(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        res.render("../../resources/user/userinfo.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).send("Error retrieving student information");
    }
  }
  //[GET] /user/edit
  async renderEditForm(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        res.render("../../resources/user/suathongtin.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).send("Error retrieving student information");
    }
  }

  //[POST] /user/edit
  async updateUserInfor(req, res) {
    try {
      const {name, phone, address, password, userName} = req.body;
      req.session.account.TenTaiKhoan = userName;
      req.session.account.HoVaTen = name;
      req.session.account.SoDienThoai = phone;
      req.session.account.DiaChi = address;
      req.session.account.MatKhau = password;
      await account.updateDataAccount(
        name,
        phone,
        address,
        password,
        req.session.account.MaTaiKhoan
      );
      res.redirect("/user");
    } catch (error) {
      res.status(500).send("Failed to update student information");
    }
  }
}
module.exports = new userController();

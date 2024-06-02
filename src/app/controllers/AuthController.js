const Account = require("../models/Account");

class AuthController {
  //[GET] /login
  login(req, res) {
    if (req.session.isLoggedIn) {
      res.redirect("/");
    } else {
      res.render("login");
    }
  }
  //[POST] /login
  async postLogin(req, res) {
    try {
      const accountInfo = await Account.getAttributeOutTable();
      const {username, password} = req.body;
      let foundValidAccount = false;
      for (const account of accountInfo) {
        if (username === account.TenTaiKhoan && password === account.MatKhau) {
          if (account.KhoaTaiKhoan) {
            res.render("login", {lock: true});
          } else {
            req.session.isLoggedIn = true;
            req.session.account = account;
            foundValidAccount = true;
            res.redirect("/");
          }
          break;
        }
      }
      if (!foundValidAccount) {
        res.render("login", {error: true});
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[DELETE] /login/logout
  logout(req, res) {
    req.session.isLoggedIn = false;
    delete req.session.account;
    delete req.session.checkedAdd;
    delete req.session.displayNotice;
    res.redirect("/login");
  }
}
module.exports = new AuthController();

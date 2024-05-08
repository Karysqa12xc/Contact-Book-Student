const Account = require("../models/Account");
class AuthController {
  //[GET] /login
  login(req, res, next) {
    if(req.session.isLoggedIn){
      res.redirect("/");
    }
    res.render("../../resources/views/login.hbs");
  }
  //[POST] /login
  async postLogin(req, res, next) {
    const accountInfo = await Account.getAttributeOutTable();
    const {username, password} = req.body;
    for (const account of accountInfo) {
      if (
        username === account.TenTaiKhoan &&
        password === account.MatKhau
      ) {
        req.session.isLoggedIn = true;
        req.session.account = account;
        res.redirect("/");
        return;
      }
    }
    res.redirect("/login");
  }
  logout(req, res, next) {
    req.session.isLoggedIn = false;
    delete req.session.account;
    res.redirect("/login"); 
  }
}
module.exports = new AuthController();

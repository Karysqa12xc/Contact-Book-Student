const Account = require("../models/Account");
class AuthController {
  //[GET] /login
  login(req, res) {
    if(req.session.isLoggedIn){
      res.redirect("/");
    }else{
      res.render("login");
    }
  }
  //[POST] /login
  async postLogin(req, res) {
    const accountInfo = await Account.getAttributeOutTable();
    const {username, password} = req.body;
    for (const account of accountInfo) { 
      if (username === account.TenTaiKhoan &&
        password === account.MatKhau && 
        account.KhoaTaiKhoan !== true) {
        req.session.isLoggedIn = true;
        req.session.account = account;
        res.redirect("/");
        return;
        
      }else if(account.KhoaTaiKhoan === true){
        res.render("login", {lock: true});
      }
      else{
        res.render("login", {error: true});
      }
    } 
  }
  logout(req, res) {
    req.session.isLoggedIn = false;
    delete req.session.account;
    delete req.session.checkedAdd;
    delete req.session.displayNotice;
    res.redirect("/login"); 
  }
}
module.exports = new AuthController();

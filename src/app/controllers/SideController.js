const Account = require("../models/Account");

class SideController {
  //[GET] /home or /
  async index(req, res, next) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        const account = req.session.account;
        let isLoggedIn = req.session.isLoggedIn;
        console.log(account);
        res.render("home", {account: account, isLoggedIn: isLoggedIn});
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /about
  about(req, res, next){
     res.render("../../resources/views/login.hbs");
  }
}


module.exports = new SideController();

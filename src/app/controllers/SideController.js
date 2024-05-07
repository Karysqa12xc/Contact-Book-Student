class SideController {
  //[GET] /home or /
  async index(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        console.log(req.session.account);
        if(req.session.displayNotice){
          req.session.displayNotice = false;
        }
        res.render("home", {account: req.session.account, logged: req.session.isLoggedIn});
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /about
  about(req, res){
    if (!req.session.isLoggedIn) {
      return res.redirect("login");
    }else{
      res.render("about", {account: req.session.account, logged: req.session.isLoggedIn});
    }
  }
}


module.exports = new SideController();

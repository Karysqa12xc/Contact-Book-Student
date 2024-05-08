class SideController {
  //[GET] /home or /
  async index(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
<<<<<<< HEAD
        console.log(req.session.account);
        if(req.session.displayNotice){
          req.session.displayNotice = false;
        }
        res.render("home", {account: req.session.account, logged: req.session.isLoggedIn});
=======
        res.render("home", 
        {
          account: req.session.account,
          isLoggedIn: req.session.isLoggedIn
        });
>>>>>>> fedeea3 (feat: tao lai kha nang dang nhap cho giao dien moi)
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /about
<<<<<<< HEAD
  about(req, res){
    if (!req.session.isLoggedIn) {
      return res.redirect("login");
    }else{
      res.render("about", {account: req.session.account, logged: req.session.isLoggedIn});
    }
=======
  about(req, res, next){
    res.render("about",  
    {
      account: req.session.account, 
      isLoggedIn: req.session.isLoggedIn
    });
>>>>>>> fedeea3 (feat: tao lai kha nang dang nhap cho giao dien moi)
  }
}


module.exports = new SideController();

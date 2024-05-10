class SideController {
  //[GET] /home or /
  async index(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        res.render("home", 
        {
          account: req.session.account,
          logged: req.session.isLoggedIn
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /about
  about(req, res, next){
    res.render("about",  
    {
      account: req.session.account, 
      isLoggedIn: req.session.isLoggedIn
    });
  }
}


module.exports = new SideController();

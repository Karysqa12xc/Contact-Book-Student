
const account = require("../models/Account");
class userController {
  async UserInfo(req, res) {
    
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/");
          } else {
            res.render('../../resources/user/userinfo.hbs', { account: req.session.account,
                logged: req.session.isLoggedIn,});
          }
      
    } catch (error) {
      res.status(500).send('Error retrieving student information');
    }
  }
    async renderEditForm(req, res) {
        const MaTaiKhoan = req.params.id;
        try {
            if (!req.session.isLoggedIn) {
                res.redirect("/");
              } else {
                res.render('../../resources/user/suathongtin.hbs', { account: req.session.account,
                    logged: req.session.isLoggedIn,});
              }
          
        } catch (error) {
          res.status(500).send('Error retrieving student information');
        }
      }
    
    
      async updateUserInfor(req, res) {
        try {
            const {
                name, phone,address,password
            } = req.body;
            await account.updateDataAccount(name, phone,address, password, req.session.account.MaTaiKhoan);
            res.redirect("back");
        } catch (error) {
          res.status(500).send('Failed to update student information');
        }
      }
}
module.exports = new userController();
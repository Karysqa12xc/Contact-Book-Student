const Role = require("../models/Role");
const Account = require("../models/Account");
const {uuid} = require("uuidv4");
class AdminController {
  //[GET] /admin/create_account
  async create_account_view(req, res, next) {
    if (!req.session.isLoggedIn) {
      res.redirect("/");
    } else {
      const RoleInfo = await Role.getAll();
      console.log(RoleInfo);
      res.render("../../resources/admin/create_account", {
        roles: RoleInfo,
        account: req.session.account,
        logged: req.session.isLoggedIn,
      });
    }
  }
  //[POST] /admin/create_account
  async create_account_post(req, res, next) {
    try {
      const {
        role,
        username,
        password,
        fNameAndlName,
        telephone,
        address,
        birth,
        inlineRadioOptions,
      } = req.body;
      const ID_Account = role + uuid();
      console.log(req.body  + ID_Account);
      await Account.addNewData(ID_Account,
        username, password, fNameAndlName, telephone, address, birth,
        inlineRadioOptions, false, null, role
      );
      res.redirect("/");
    } catch (error) {
        res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
}
module.exports = new AdminController();

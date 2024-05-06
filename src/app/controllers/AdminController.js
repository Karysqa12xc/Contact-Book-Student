const Class = require("../models/Class");
const Account = require("../models/Account");
const Role = require("../models/Role");
const {uuid} = require("uuidv4");
class AdminController {
  //[GET] /admin/create_account
  async create_account_view(req, res) {
    if (!req.session.isLoggedIn) {
      res.redirect("/");
    } else {
      const RoleInfo = await Role.getAll();
      console.log(RoleInfo);
      res.render("../../resources/admin/create_account.hbs", {
        roles: RoleInfo,
        account: req.session.account,
        logged: req.session.isLoggedIn,
      });
    }
  }
  //[POST] /admin/create_account
  async create_account_post(req, res) {
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
      console.log(req.body + ID_Account);
      await Account.addNewData(
        ID_Account,
        username,
        password,
        fNameAndlName,
        telephone,
        address,
        birth,
        inlineRadioOptions,
        false,
        null,
        role
      );
      res.redirect("/");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /admin/class-management
  async class_management_view(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const classInfo = await Class.getAllReverse();
        let arrayCountAccountInClass = [];
        for (const IdClass of classInfo) {
          const quantityAccount = await Account.CountAccountInClass(
            IdClass.MaLop
          );
          arrayCountAccountInClass.push(quantityAccount);
        }
        const accountNullIdClass = await Account.getDataIdClassNull();
        res.render("../../resources/admin/class_management.hbs", {
          AccountInClass: arrayCountAccountInClass,
          AccountHadIdClassNull: accountNullIdClass,
          classes: classInfo,
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[POST] /admin/class-management
  async class_management_post(req, res, next) {
    try {
      const {className, quantityClass} = req.body;
      console.log(req.body);
      await Class.addNewData(className, quantityClass);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[PUT] /admin/:id/add-student-into-class
  async add_student_into_class(req, res) {
    try {
      res.redirect("back");
    } catch (error) {}
  }
}
module.exports = new AdminController();

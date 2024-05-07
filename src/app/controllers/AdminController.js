const Class = require("../models/Class");
const Account = require("../models/Account");
const Role = require("../models/Role");
const {uuid} = require("uuidv4");
class AdminController {
  //[GET] /admin/account-management
  async account_management_view(req, res) {
    if (!req.session.isLoggedIn) {
      res.redirect("/");
    } else {
      const RoleInfo = await Role.getAll();
      console.log(RoleInfo);
      res.render("../../resources/admin/account_management.hbs", {
        roles: RoleInfo,
        account: req.session.account,
        logged: req.session.isLoggedIn,
      });
    }
  }
  //[POST] /admin/account-management
  async account_management_post(req, res) {
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
          checkedAdd: req.session.checkedAdd,
          displayNotice: req.session.displayNotice,
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
      const {idClass, AccountAddIntoClass} = req.body;
      const classId = idClass[0];
      let checkedAdd = false;
      let displayNotice = false;
      const classGetById = await Class.getById(classId);
      for (const accountId of AccountAddIntoClass) {
        let quantityAccount = await Account.CountAccountInClass(classId);
        checkedAdd = quantityAccount[0].HocSinhTrongLop < classGetById[0].SiSo;
        displayNotice = true;
        if (quantityAccount[0].HocSinhTrongLop < classGetById[0].SiSo) {
          await Account.updateDataIdClass(classId, accountId);
        } else {
          break;
        }
      }
      req.session.checkedAdd = checkedAdd;
      req.session.displayNotice = displayNotice;
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[POST] /admin/:id/class-details
  async class_details(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const {id, name_class} = req.body;
        const AccountInThisClass = await Account.getByIdClass(id);
        if(req.session.displayNotice){
          req.session.displayNotice = false;
        }
        res.render("../../resources/admin/class_details.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
          accountInThisClass: AccountInThisClass,
          NameClass: name_class,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[PUT] /admin/:id/class-details
  async delete_account_in_class(req, res){
    try {
      const { id } = req.body;
      await Account.updateDataIdClass(null, id);
      res.redirect("/admin/class-management");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
}
module.exports = new AdminController();

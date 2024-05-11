const Class = require("../models/Class");
const Account = require("../models/Account");
const Role = require("../models/Role");
const Course = require("../models/Course");
const Semester = require("../models/Semester");
const {uuid} = require("uuidv4");
class AdminController {
  //[GET] /admin/account-management
  async account_management_view(req, res) {
    if (!req.session.isLoggedIn) {
      res.redirect("/");
    } else {
      const RoleInfo = await Role.getDataDifAdmin();
      const AccountInfo = await Account.getDataAccountRefRoleAndClass();
      res.render("../../resources/admin/account_management.hbs", {
        roles: RoleInfo,
        accountInfo: AccountInfo,
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
      res.redirect("back");
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
        if (req.session.displayNotice) {
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
  async delete_account_in_class(req, res) {
    try {
      const {id} = req.body;
      await Account.updateDataIdClass(null, id);
      res.redirect("/admin/class-management");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[PUT /admin/:id/lock-account
  async lock_account(req, res) {
    try {
      let {idAccount, isLocked} = req.body;
      if (isLocked === "true" || isLocked === true) {
        isLocked = 0;
      } else {
        isLocked = 1;
      }
      await Account.updateDataLockAccount(isLocked, idAccount);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /admin/course
  async course_view(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const course = await Course.getDataOuterTable();
        const accountTeacher = await Account.getDataTeacherInAccount();
        res.render("../../resources/admin/course_management.hbs", {
          course: course,
          accountTeacher: accountTeacher,
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[POST] /admin/course-create
  async course_create(req, res) {
    try {
      const {course_name, start_time, end_time, money_course} = req.body;
      let courseRename = `${course_name} - (${start_time}, ${end_time})`;
      await Course.addNewData(courseRename, start_time, end_time, money_course);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[PUT] /admin/course-update-teacher
  async course_update_teacher(req, res) {
    try {
      const {charge_teacher, idTeacher} = req.body;

      await Course.updateMaTaiKhoanOfCourse(idTeacher, charge_teacher);
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[DELETE] /admin/delete-course
  async delete_course(req, res) {
    try {
      const {IdCourse} = req.body;
      for (let index = 0; index < IdCourse.length; index++) {
        const element = IdCourse[index];
        await Course.deleteCourse(element);
      }
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /admin/management-timetable
  async viewTKB(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        const IdAndNameOfClass = await Class.getAll();
        const IdAndNameOfCourse = await Course.getAll();
        const SemesterInfo = await Semester.getAll();
        const semesterID = await req.query.semester;
        res.render("../../resources/admin/timetable_management.hbs", {
          Classes: IdAndNameOfClass,
          Courses: IdAndNameOfCourse,
          SemesterInfo: SemesterInfo,
          semesterID: semesterID,
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[POST] /admin/create-semester
  async createSemester(req, res) {
    try {
      const {idSemester, nameSemester, StartTimeSemester, EndTimeSemester} =
        req.body;
      await Semester.addNewDataInHocKi(
        idSemester,
        nameSemester,
        StartTimeSemester,
        EndTimeSemester
      );
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
}
module.exports = new AdminController();

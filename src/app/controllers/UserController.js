const account = require("../models/Account");
class userController {
  //[GET] /user
  async UserInfo(req, res) {
    try {
      //Cái này check xem đã có tài khoản đăng nhập chưa
      // Chưa thì quay lại trang login
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        //Chuyển sang trang user info với dữ liệu 
        // được truyền là session của logged và account 
        res.render("../../resources/user/userinfo.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).send("Error retrieving student information");
    }
  }
  //[GET] /user/edit
  async renderEditForm(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        res.redirect("/");
      } else {
        res.render("../../resources/user/suathongtin.hbs", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).send("Error retrieving student information");
    }
  }

  //[POST] /user/edit
  async updateUserInfor(req, res) {
    try {
      //Tạo một đối tượng gán dữ liệu từ trong form gửi lên
      const {name, phone, address, password, userName} = req.body;
      //Gán các dữ liệu mới vào session của account
      req.session.account.TenTaiKhoan = userName;
      req.session.account.HoVaTen = name;
      req.session.account.SoDienThoai = phone;
      req.session.account.DiaChi = address;
      req.session.account.MatKhau = password;
      //Cập nhật vào database
      await account.updateDataAccount(
        name,
        phone,
        address,
        password,
        userName,
        req.session.account.MaTaiKhoan
      );
      //Quay lại trang user
      res.redirect("/user");
    } catch (error) {
      res.status(500).send("Failed to update student information");
    }
  }
}
module.exports = new userController();
